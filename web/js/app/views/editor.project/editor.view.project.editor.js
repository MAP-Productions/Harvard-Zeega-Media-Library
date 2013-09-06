(function(Project) {

	// This will fetch the tutorial template and render it.
	Project.Views.Editor = Backbone.View.extend({

		id : 'project-header',
		
		isRendered : false,

		initialize : function()
		{
			//automatically re-render the view if the title or cover image are changed/updated
			this.model.on('change:title change:cover_image', this.render, this);
			this.model.on('ready', this.initEvents, this);
		},

		render: function()
		{
			console.log('loggin p',this.model);
			console.log(this.model.get('published'));
			this.setElement( $('#zeega-project-info') );
			this.$el.html( _.template( this.getTemplate(), this.model.toJSON() ));

			this.projectButtons = new Project.Views.Editor.ProjectButtons({model:this.model});
			this.$el.find('#project-actions').html( this.projectButtons.render().el );
			
			return this;
		},
		
		//initialize events that cannot be set in events:{}
		initEvents : function()
		{
			var _this = this;
			this.model.off('ready', this.initEvents);

			this.model.frames.on('change',this.showSaveIndicator, this );
			this.model.layers.on('change',this.showSaveIndicator, this );
			this.model.sequences.on('change',this.showSaveIndicator, this );
			this.on('change',this.showSaveIndicator, this );

			this.model.frames.on('sync',this.onProjectChange, this );
			this.model.layers.on('sync',this.onProjectChange, this );
			this.model.sequences.on('sync',this.onProjectChange, this );
			this.on('sync',this.onProjectChange, this );

		},

		showSaveIndicator : function()
		{
			$('#save-indicator').spin('tiny');
		},

		hideSaveIndicator : function()
		{
			$('#save-indicator').spin(false);
		},

		onProjectChange : function()
		{
			this.model.updated = true;
			this.hideSaveIndicator();
			this.projectButtons.render();
		},
		
		events : {
			'keypress #zeega-project-title' : 'onTitleKeypress',
			'blur #zeega-project-title' : 'saveTitle'
		},

		//the callback when text is being entered into the title field
		onTitleKeypress : function(e)
		{
			var _this = this;
			if(e.which==13)
			{
				e.preventDefault();
				this.$el.find('#zeega-project-title').blur();
				this.saveTitle();
				return false;
			}
		},
		
		saveTitle : function()
		{
			if(this.$el.find('#zeega-project-title').text() != this.model.get('title'))
			{
				var t = this.$el.find('#zeega-project-title').text() === '' ? 'untitled' : this.$el.find('#zeega-project-title').text();
				//this.$el.find('#zeega-project-title').effect('highlight',{},2000);
				this.model.save({ 'title' : t });
			}
		},
		
		getTemplate : function()
		{
			var html =
			
			"<div id='zeega-project-title' contenteditable='true'><%= title %></div>"+
			"<div id='project-actions' class='menu-bar clearfix' ></div>";
			
			return html;
		}
	});

	Project.Views.Editor.ProjectButtons = Backbone.View.extend({

		tagName : 'ul',
		className : 'pull-right',

		initialize : function()
		{
			this.model.on('update_buttons', this.render, this);
		},

		render : function()
		{
			var _this = this;
			var classes = {
				options_class : this.model.get('published') ? '': 'disabled',
				publish_class : this.model.updated || this.model.get('date_updated') != this.model.get('date_published') ? '' : 'disabled',
				share_class : this.model.get('published') ? '' : 'disabled'
			};

			this.$el.html( _.template( this.getTemplate(), _.extend(classes, this.model.toJSON()) ) );


			this.$el.find('#project-cover-image').droppable({

				accept : '.database-asset-list',
				//activeClass : 'cover-image-accept',
				//hoverClass : 'cover-image-hover',
				tolerance : 'pointer',

				//this happens when you drop a database item onto a frame
				drop : function( event, ui )
				{
					//make sure the dropped item is a valid image
					var item = zeega.app.draggedItem;
					if(item.get('layer_type') == 'Image')
					{
						ui.draggable.draggable('option','revert',false);
						_this.saveCoverImage( zeega.app.draggedItem.get('uri') );
					}

				}
			});

			return this;
		},

		events : {
			'click #project-share' : 'clickShare',
			'click #project-publish' : 'clickPublish',
			'click #project-options' : 'clickSettings',
			'click #project-preview' : 'clickPreview',
			'click #project-cover-image' : 'clickCoverImage'
		},

		clickCoverImage : function(){ return false; },

		saveCoverImage : function( uri ){ this.model.save({ 'cover_image' : uri }); },

		clickShare : function(e)
		{
			if( !$(e.target).closest('a').hasClass('disabled') ) this.model.shareProject();
			return false;
		},
		
		clickPublish : function(e)
		{
			if( !$(e.target).closest('a').hasClass('disabled') && this.model.get('published')) {
				this.model.publishProject(e);
			} else {
				var Modal = zeega.module('modal');
				var view = new Modal.Views.PublishProject({ model:this.model });
				$('body').prepend( view.render().el );
				view.show();
				console.log('newly published good job');
			}

			return false;
		},
		
		clickSettings : function(e)
		{
			if( !$(e.target).closest('a').hasClass('disabled') ) this.model.settingsProject();
			return false;
		},
		
		clickPreview : function(e)
		{
			if( !$(e.target).closest('a').hasClass('disabled') ) zeega.app.previewSequence();
			return false;
		},
		
		getTemplate : function()
		{
			var html =
					"<li><a id='project-cover-image' href='#' style='background:url(<%= cover_image %>);background-size:100% 100%'></a></li>"+
					"<li><a id='project-options' class='<%= options_class %>' href='#'><div class='menu-verbose-title'>options</div><i class='icon-tasks icon-white'></i></a></li>";
					
			if(this.model.get('published')){
				html+="<li><a id='project-publish' class='<%= publish_class %>' href='#'><div class='menu-verbose-title'>update</div><i class='icon-print icon-white'></i></a></li>";
			} else {
				html+="<li><a id='project-publish' class='<%= publish_class %>' href='#'><div class='menu-verbose-title'>publish</div><i class='icon-print icon-white'></i></a></li>";
			}
					
			html+=	"<li><a id='project-share' class='<%= share_class %>' href='#'><div class='menu-verbose-title'>share</div><i class='icon-gift icon-white'></i></a></li>"+

				"<li><a id='project-preview' href='#'><div class='menu-verbose-title'>preview</div><i class='icon-play icon-white'></i></a></li>";
			
			return html;
		}

	});
	
})(zeega.module("project"));
