(function(Items) {

	//renders individual items in a search be they collection or image or audio or video type
	Items.Views.Ingesting = Backbone.View.extend({
		
		el : $("#item-view"),

		initialize: function()
		{
			this.model.view = this;
		},
	
		render: function()
		{
			var item = this.model;
			var theElement = this.el;
			var view = this;
			this.$el.find('#widget-title').text( this.model.get('title'));
			this.$el.find('#widget-creator').text( this.model.get('media_creator_username'));
			this.$el.find('#widget-description').text( this.model.get('description'));
			
			var media_type = this.model.get('media_type');
			// move to events (didn't work for me)
			this.$el.find('#add-item').click(function(){
				$(this).fadeOut();

				$('#begin-message').html("Adding media.");
				var errorMessage = 'Unable to add Media';

				if(media_type == 'Collection') {
					errorMessage = "Your media was added to the HELP Platform and is being processed. It might take a few minutes before you can see it on the editor.";
				}

				var itemType = item.get("media_type");
				item.url = sessionStorage.getItem('hostname') + sessionStorage.getItem('directory') + 'bookmarklet/persist';
				item.save({ },{
						success: function(model, response) {
							$('#begin-message').hide();
							$('#message').fadeIn('fast');
						},
						error: function(model, response){
							$('#begin-message').html(errorMessage).fadeIn();
						}
				});
			});

			return this;

		},
		getTemplate : function()
		{
			var html =	'<span class="item-icon show-in-list-view zicon zicon-<%= type %>"></span>' +
						'<img class="item-thumbnail" src="<%= thumbUrl %>"/>' +
						'<div class="item-title show-in-list-view"><%= title %></div>';

			return html;
		}

	});

})(zeegaWidget.module("items"));
