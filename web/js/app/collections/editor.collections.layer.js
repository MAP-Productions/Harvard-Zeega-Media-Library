(function(Layer){

	Layer.MasterCollection = Backbone.Collection.extend({
		
		initialize : function()
		{
			//create a display collection that will have layer models
			//copied into it and then displayed ad hoc
			
			this.visible = []

		},
		
		/*
		adds an existing layer to the layer collection.
		Duplicated layers do not need saving
		*/
		duplicateLayer : function( oldLayerID, newLayerID )
		{
			var oldLayer = this.get(oldLayerID);
			var dupeLayer = oldLayer.clone();
			console.log('$$		dupe layer', oldLayerID, newLayerID, oldLayer, dupeLayer)
			dupeLayer.generateNewViews();
			dupeLayer.set('id', newLayerID );
			this.add(dupeLayer);
			oldLayer.save()
		},
		
		removeLayer : function(layer){ this.removeLayerFromFrame(layer) },
		
		removeLayerFromFrame : function( layer, frame )
		{
			
			if( _.isUndefined(frame) ) frame = zeega.app.currentFrame;
			if( frame.get('layers') )
			{
				//if the layer array already exists eliminate false values if they exist
				var layerOrder = _.without( frame.get('layers'), parseInt(layer.id) );
				if( layerOrder.length == 0 ) layerOrder.push(false);
				//set the layerOrder array inside the frame
				frame.set({'layers':layerOrder});
				frame.save();
			}
			
		}
		
	});

})(zeega.module("layer"));