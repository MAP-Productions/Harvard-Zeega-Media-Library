(function(Modal) {

	
	Modal.Views.LinkExisting = Backbone.View.extend({

		className : 'modal',
		
		render: function()
		{
			var _this = this;
			this.$el.html( this.getTemplate() );
			
			//fill options for selecting a sequence
			_.each( _.toArray(zeega.app.project.sequences), function(sequence){
				$(_this.el).find('.sequence-choose-select').append('<option value="'+sequence.id+'">'+ sequence.get('title') +'</option>');
			});
			
			_.each( zeega.app.project.sequences.at(0).get('frames'), function(frameID){
				console.log("rendering some thumbs", zeega.app.project.frames.get(frameID).get('thumbnail_url'));
				if(zeega.app.currentFrame.id == frameID)
					_this.$el.find('.frame-choose-list').append('<li class="frame-thumb-no-choose-icon" data-id="'+ frameID +'"><div style="height: 50px; width:67px;background-color:grey; background: url(\"'+ zeega.app.project.frames.get(frameID).get('thumbnail_url') +'\")" ></div></li>');
				else _this.$el.find('.frame-choose-list').append('<li class="frame-thumb-choose-icon" data-id="'+ frameID +'"><div style="cursor: pointer; height: 50px; width:67px;background-color:black; background: url(\"'+ zeega.app.project.frames.get(frameID).get('thumbnail_url') +'\")" ></div></li>');
			});
			
			this.targetSequence = zeega.app.project.sequences.at(0).id;
			
			return this;
		},
		
		show : function(){ this.$el.modal('show'); },
		
		hide : function()
		{
			this.model.trigger('cancel_connection');
			this.$el.modal('hide');
			this.remove();
			return false;
		},
		
		events : {
			'change .sequence-choose-select' : 'selectSequence',
			'click li.frame-thumb-choose-icon' : 'selectFrame',
			'click .close' : 'hide',
			'click .save' : 'makeConnection'
		},
		
		selectSequence : function()
		{
			var _this = this;
			var sequenceID = $(_this.el).find('.sequence-choose-select').val();
			
			$(this.el).find('.btn-primary').addClass('disabled').removeClass('save btn-primary');
			
			$(this.el).find('.frame-choose-list').empty();
			_.each( zeega.app.project.sequences.get( sequenceID ).get('frames'), function(frameID){
				$(_this.el).find('.frame-choose-list').append('<li class="frame-thumb-choose-icon" data-id="'+ frameID +'"><img src="'+ zeega.app.project.frames.get(frameID).get('thumbnail_url') +'"/></li>');
			});
			this.targetSequence = sequenceID;
		},
		
		selectFrame : function(e)
		{
			var frame = $(e.target).closest('li');
			$(this.el).find('.selected').removeClass('selected');
			$(frame).addClass('selected');
			$(this.el).find('.disabled').removeClass('disabled').addClass('save btn-primary');
			this.targetFrame = $(frame).data('id');
		},
		
		makeConnection : function()
		{
			this.hide();
			this.model.trigger('connectToSequenceFrame',this.targetSequence,this.targetFrame);
			return false;
		},
	
		getTemplate : function()
		{


			var html =
			
			'<div class="" id="sequence-modal">'+
				'<div class="modal-header clearfix">'+
					'<button class="close">×</button>'+
					'<h2>Create a link to another Slide</h2>'+
				'</div>'+
				'<div class="modal-body">'+
					'<h4>1. Choose Sequence:</h4>'+
					'<select class="sequence-choose-select"></select>'+
					'<h4>2. Choose Slide:</h4>'+
					'<ul class="frame-choose-list unstyled clearfix"></ul>'+
				'</div>'+
				'<div class="modal-footer">'+
					'<a href="#" class="btn close" >Close</a>'+
					'<a href="#" class="btn disabled">Save changes</a>'+
				'</div>'+
			'</div>';
			
			return html;
		}
});
	
})(zeega.module("modal"));