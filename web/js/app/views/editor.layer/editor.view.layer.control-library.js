/****************************

a note on this.settings:

DO NOT use this.settings to read in any dynamically updated content. It won't work

Use this.model.get('attr')[my_setting] instead!!!

*****************************/


(function(Layer){

    Layer.Views.Lib = Backbone.View.extend({
        defaults : {},
        initialize : function( args )
        {
            this.settings = _.defaults( args, this.defaults );
            $(this.el).addClass('control');
            this.init();
            
            if(this.model)
            {
                this.model.on('editor_controlsOpen', this.private_onControlsOpen, this);
                this.model.on('editor_controlsClosed', this.private_onControlsClosed, this);
                this.model.on('editor_layerEnter', this.private_onLayerEnter, this);
                this.model.on('editor_layerExit', this.private_onLayerExit, this);
            }
        },
        
        init : function(){},
        
        getControl : function()
        {
            this.render();
            return this.el;
        },
        
        onControlsOpen : function(){},
        onControlsClosed : function(){},
        onLayerEnter : function(){},
        onLayerExit : function(){},
        
        private_onControlsOpen : function()
        {
            this.onControlsOpen();
            this.delegateEvents();
        },
        private_onControlsClosed : function()
        {
            this.onControlsClosed();
            this.undelegateEvents();
        },
        private_onLayerEnter : function()
        {
            this.onLayerEnter();
            this.delegateEvents();
        },
        private_onLayerExit : function()
        {
            this.onLayerExit();
            this.undelegateEvents();
        }
        
    });



/****************************

    DEFAULT CONTROLS
    
****************************/

    Layer.Views.Lib.ContinueLayer = Layer.Views.Lib.extend({

        className : 'control continue-layer',

        render : function()
        {
            var button = '<button class="btn" style="width:100%">Continue Layer</button>';
            $(this.el).append( button );
        },
        
        events : {
            'click' : 'continueLayer'
        },
        
        continueLayer : function()
        {
            console.log('clicking button');
            this.$el.find('button').effect('highlight',{},2000);
            zeega.app.continueLayer( this.model.id );
        }
        
    });

    Layer.Views.Lib.ContinueToNextFrame = Layer.Views.Lib.extend({

        className : 'control continue-to-next',

        render : function()
        {
            var button = '<button class="btn" style="width:100%">Continue on next frame</button>';
            $(this.el).append( button );
        },
        
        events : {
            'click' : 'continueLayerToNextFrame'
        },
        
        continueLayerToNextFrame : function()
        {
            this.$el.find('button').effect('highlight',{},2000);
            
            zeega.app.continueLayerToNextFrame( this.model.id );
        }
        
    });
    
    Layer.Views.Lib.ContinueOnAllFrames = Layer.Views.Lib.extend({

        className : 'control continue-to-all',
        
        defaults : {active:false},
        
        render : function()
        {
            var button = '<button class="btn" style="width:100%">Continue on all frames</button>';
            $(this.el).append( button );
            if(this.settings.active) $(this.el).find('button').addClass('active btn-warning');
        },
        
        events : {
            'click' : 'continueOnAllFrames'
        },
        
        continueOnAllFrames : function()
        {
            console.log('continuing on all frames button');
            if( this.$el.find('button').hasClass('active') )
                this.$el.find('button').removeClass('active btn-warning');
            else
                this.$el.find('button').addClass('active btn-warning');
            
            this.$el.find('button').effect('highlight',{},2000);
            
            console.log( 'continue layer on all frames!: '+ this.model.id );
            zeega.app.continueOnAllFrames( this.model );
            
        }
        
    });
    
    Layer.Views.Lib.Link = Layer.Views.Lib.extend({

        className : 'control link-controls',

        render : function()
        {
            var link = this.model.get('attr').link || '';
            $(this.el).append( _.template( this.getTemplate(), {link:link} ) );
        },
        
        events : {
            'click .remove-link' : 'clearLink',
            'focus input' : 'focusInput',
            'blur input'    : 'updateLink'
        },
        
        clearLink : function()
        {
            this.$el.find('input').val('');
            this.updateLink();
            return false;
        },
        
        focusInput : function()
        {
            var _this = this;
            this.$el.find('input').keypress(function(e){
                if( e.which == 13 )
                {
                    _this.updateLink();
                    this.blur();
                    return false;
                }
            });
        },
        
        updateLink : function()
        {
            this.$el.find('input').unbind('keypress');
            var fieldValue = this.$el.find('input').val().replace('http://','');
            
            
            
            if( fieldValue != this.model.get('attr').link )
            {
                this.$el.find('input, .add-on').effect('highlight',{},2000);
                this.model.update({ link : fieldValue });
            }
        },

        getTemplate : function()
        {
            html =
            
                '<div class="input-prepend">'+
                    '<span class="add-on">http://</span>'+
                    '<input class="span2" type="text" placeholder="www.example.com" value="<%= link %>">'+
                    '<a href="#" class="remove-link close">&times;</span>'+
                '</div>';
                
            return html;
        }
        
    });
    
    
/***********************************

    OPTIONAL CONTROLS
    
************************************/

    Layer.Views.Lib.Target = Layer.Views.Lib.extend({
        
        defaults : {
            className : '',
            idName : ''
        },
        
        init : function( args )
        {},
        
        render : function()
        {
            $(this.el).attr('id', 'media-controls-'+this.model.id);
        }
        
    });
    
    Layer.Views.Lib.SectionLabel = Layer.Views.Lib.extend({
        
        className : 'section-head',
        
        defaults : {
            label : 'Section'
        },
        
        render : function()
        {
            $(this.el).html( this.settings.label ).css({
                'text-align':'center',
                'font-weight':'bold',
                'font-size':'16px'
            });
            return this;
        }
        
    });

    Layer.Views.Lib.Checkbox = Layer.Views.Lib.extend({
        
        defaults : {
            label : 'Checkbox',
            value : 0,
            save : true
        },
        
        render : function()
        {
            var _this = this;
            var check = '';
            if(this.model.get('attr')[this.settings.property]) check = 'checked';
            $(this.el).append( _.template( this.getTemplate(), _.extend(this.settings,{check:check}) ) );
            var count = 0;
            this.$el.find('input').change(function(){
                _this.saveValue( $(this).is(':checked') );
            });
            return this;
        },
        
        saveValue : function(value)
        {
            if(this.settings.save)
            {
                var attr = {};
                attr[this.settings.property] = value;
                this.model.update( attr );
            }
        },
        
        getTemplate : function()
        {
            html =
            
            "<form class='form-inline' style='height:0px'>"+
                "<label class='checkbox'><input type='checkbox' <%= check %>> <%= label %></label>"+
            "</form>";
            
            return html;
        }
        
    });

    Layer.Views.Lib.Slider = Layer.Views.Lib.extend({
        
        className : 'control control-slider clearfix',
        defaults : {
            label : 'control',
            min : 0,
            max : 100,
            step : 1,
            value : 100,
            silent : false,
            suffix : '',
            css : true,
            scaleWith : false,
            scaleValue : false,
            callback : false,
            save : true,
            
            
            onSlide : function(){},
            onChange : function(){},
            onStart : function(){},
            onStop : function(){},
            
            slide : null
        },
        
        events : {
            'focus .slider-num-input' : 'onInputFocus',
            'keypress .slider-num-input' : 'onKeypress',
            'click .slider-num-input' : 'onInputClick'
        },

        init: function()
        {
            this.lazySave = _.debounce( this.saveRoutine, 2000 );
        },

        onInputClick : function()
        {
            this.$('.slider-num-input').focus();
        },
        onInputFocus : function()
        {
        },
        
        render : function()
        {
            
            var _this = this;
    
            if(this.settings.property=="top"||this.settings.property=="left"){
                this.model.on('update',function(){
                    console.log('update slider pos', _this.model);
                    
                    _this.updateSliderInput( _this.model.get('attr')[_this.settings.property] );
                    /*
                    _this.$('.control-slider').slider('option', {'value':_this.model.get('attr')[_this.settings.property]});
                    _this.$('.slider-num-input').html(_this.model.get('attr')[_this.settings.property]).css({'left': _this.$el.find('a.ui-slider-handle').css('left') });
                    */
                });
            }
            
            
            var uiValue = ( !_.isUndefined(this.model.get('attr')[this.settings.property]) ) ? this.model.get('attr')[this.settings.property] : this.settings.value;
            this.$el.append( _.template( this.getTemplate(), _.extend(this.settings,{uiValue:uiValue}) ));

            //slider stuff here
            this.$el.find('.control-slider').slider({
                range : 'min',
                min : this.settings.min,
                max : this.settings.max,
                value : uiValue,
                step : this.settings.step,
                start : function(e,ui) {
                    _this.settings.onStart();
                    $('#layer-visual-'+_this.model.id).css({'outline':'solid 3px yellow'});
                    
                },
                slide : function(e, ui) {
                    _this.updateSliderInput(ui.value);
                    _this.updateVisualElement( ui.value );
                    
                    _this.value = ui.value;
                    
                    if( !_.isNull( _this.settings.slide ) ) _this.settings.slide();
                    _this.settings.onSlide();
                },
                change : function(e,ui) {
                    if(e.which==1 || e.which== 37 || e.which== 38 || e.which== 39 || e.which== 40 ){
                        console.log('change event');
                        _this.updateSliderInput(ui.value);
                        _this.saveValue(ui.value);
                        _this.settings.onChange();
                    }
                    
                    
                },
                stop : function(e,ui)
                {
                    if(e.which==1)_this.settings.onStop();
                    $('#layer-visual-'+_this.model.id).css({'outline':'none'});
                    
                }
                
            });
            
            this.$el.find('.slider-num-input').html(uiValue).css({'left': _this.$el.find('a.ui-slider-handle').css('left') });
            
            
            
            return this;
        },
        
        updateVisualElement : function(value)
        {
            if( this.settings.css )
                this.model.visual.$el.css( this.settings.property, value + this.settings.suffix );
        },
        
        updateSliderInput : function(value)
        {
            var rounded = Math.round( value * 100 ) / 100;
            this.$('.control-slider').slider('option', {'value':rounded});
            this.$('.slider-num-input').html(rounded).css({'left': this.$el.find('a.ui-slider-handle').css('left') });
        },
        
        insertNumberField : function()
        {
            this.$el.find('.control-slider').prepend();
        },
        
        getValue : function()
        {
            return this.$el.find('.control-slider').slider('option','value');
        },
        
        onKeypress : function(e)
        {
            if( e.which == 13 )
            {
                this.updateFromInput();
                return false;
            }
            else if( e.which > 44 && e.which < 58){}
            else return false;
        },
        
        updateFromInput : function()
        {
            var newValue = parseFloat( this.$el.find('.slider-num-input').text() );
            this.$el.find('.slider-num-input').blur();
            this.$el.find('.control-slider').slider('value', newValue);
            
            this.saveValue(newValue);
        },
        
        saveValue : function(value)
        {
            if(this.settings.save)
            {
                this.lazySave(value);
            }
        },

        saveRoutine : function(value)
        {
            console.log('------save routine');
            var attr = {};
            attr[this.settings.property] = value;
            this.model.update( attr );
            this.updateVisualElement( value );
        },

        
        getTemplate : function()
        {
            var html = ''+
            
                    "<div class='control-name' style='float:left;position:relative;top:15px;width:35%'><%= label %></div>"+
                    "<div style='float:left;width:60%;padding-right:5%'>"+
                        "<div class='slider-num-input' contenteditable='true' style='margin-bottom:5px;position:relative;display:inline-block'><%= uiValue %></div>"+
                        "<div class='control-slider'></div>"+
                    "</div>";
            
            return html;
        }
    });
    
    Layer.Views.Lib.LinkTypeSelect = Layer.Views.Lib.extend({
        className : 'control link-type-select',
        render : function()
        {
            console.log('redner control', this);
            this.$el.html( _.template(this.template(),this.settings));
            this.$('select').val(this.model.get('attr').link_type);
            return this;
        },
        events : {
            'change select' : 'changeLinkType'
        },

        changeLinkType : function(e)
        {
            console.log('change link type', this.model, $(e.target), $(e.target).val());
            this.model.update({ link_type : $(e.target).val() });

        },

        template : function()
        {
            var html =
                "<div class='control-name'><%= label %></div>"+
                '<select>'+
                    '<option value="rectangle">rectangle</option>'+
                    '<option value="arrow_left">arrow left</option>'+
                    '<option value="arrow_right">arrow right</option>'+
                    '<option value="arrow_up">arrow up</option>'+
                    '<option value="arrow_down">arrow down</option>'+
                '</select>';

            return html;
        }
    });

    Layer.Views.Lib.Droppable = Layer.Views.Lib.extend({
        className : 'control control-item-droppable',
        render : function()
        {
            _.extend( this.settings, this.model.toJSON() );
            this.$el.html( _.template(this.template(), this.settings ));
            
            this.makeDroppable();
            
            return this;
        },

        makeDroppable : function()
        {
            var _this = this;
            this.$('.target').droppable({
                accept : '.database-asset-list',
                hoverClass : 'droppable-hover',

                drop : function(e,ui)
                {
                    ui.draggable.draggable('option','revert',false);
                    _this.onDrop( zeega.app.draggedItem );
                }
            });
        },

        onDrop : function(item)
        {
            var attr = {};
            attr[this.settings.attribute] = item.toJSON();
            this.model.update( attr );
            this.render();
        },

        template : function()
        {
            var _this = this;
            var html = "<div class='control-name'><%= label %></div>";
            if( _.isUndefined( this.model.get('attr')[_this.settings.attribute] ) ) html += '<div class="target">Add Media</div>';
            else html += '<div class="target" style="background:url(<%= attr[attribute].thumbnail_url %>)"></div>';
            return html;
        }
    });
    
    //for text layer
    // ** deprecated ** //
    Layer.Views.Lib.ClearStyles = Layer.Views.Lib.extend({
        
        className : 'clear-styles',

        render : function()
        {
            var button = '<button class="btn" style="width:100%">Clear Styles</button>';
            $(this.el).append( button );
        },

        events : {
            'click' : 'clearStyles'
        },

        clearStyles : function()
        {
            var clean = this.model.get('attr').content.replace(/(<([^>]+)>)/ig, "");

            this.model.update({ content : clean });
            console.log( 'clear styles!: '+ clean );
            this.model.updateContentInPlace();
        }
        
    });
    
    Layer.Views.Lib.TextStyles = Layer.Views.Lib.extend({

        className : 'text-styles',

        render : function() {
            var buttonSet = this.getTemplate();
            $(this.el).append( buttonSet );
        },
        
        events : {
            'click .bold' : 'addBold',
            'click .italic' : 'addItalic',
            'click .underline' : 'addUnderline',
            'click .clear-styles' : 'clearStyles'
        },
        
        addBold : function() {
            if( this.model.visual.$el.find('.style-bold').length  ) {
                this.model.visual.$el.find('.style-bold').contents().unwrap();
            } else {
                this.model.visual.$el.find('.inner').wrapInner('<span class="style-bold" style="font-weight:bold"/>');
            }
            this.$el.find('.bold').effect('highlight',{},2000);
            this.saveContent();
        },
        
        addItalic: function() {
            if( this.model.visual.$el.find('.style-italic').length ) {
                this.model.visual.$el.find('.style-italic').contents().unwrap();
            } else {
                this.model.visual.$el.find('.inner').wrapInner('<span class="style-italic" style="font-style:italic"/>');
            }
            this.$el.find('.italic').effect('highlight',{},2000);
            this.saveContent();
        },
        addUnderline : function() {
            if( this.model.visual.$el.find('.style-underline').length ) {
                this.model.visual.$el.find('.style-underline').contents().unwrap();
            } else {
                this.model.visual.$el.find('.inner').wrapInner('<span class="style-underline" style="text-decoration:underline"/>');
            }
            this.$el.find('.underline').effect('highlight',{},2000);
            
            this.saveContent();
        },
        
        saveContent : function() {
            var str = this.model.visual.$el.find('#zedit-target').html();

            this.model.update({ content : str });
        },
        
        clearStyles : function() {
            var clean = this.model.get('attr').content.replace(/(<([^>]+)>)/ig, "");

            this.model.update({ content : clean });
            this.model.updateContentInPlace();
        },
        
        getTemplate : function() {
            var html =
            
                '<div class="btn-group">'+
                    '<button class="btn bold"><i class="zicon-bold"></i></button>'+
                    '<button class="btn italic"><i class="zicon-italic"></i></button>'+
                    '<button class="btn underline"><i class="zicon-underline"></i></button>'+
                    '<button class="btn clear-styles"><i class="zicon-cancel"></i></button>'+
                '</div>';
                    
            return html;
        }
        
    });
    
    Layer.Views.Lib.FontChooser = Layer.Views.Lib.extend({
        
        className : 'font-chooser',

        render : function() {
            var buttonSet = this.getTemplate();
            $(this.el).append( buttonSet );
            this.select( ".font-list", "fontFamily");
            this.select( ".size-list", "fontSize");
        },

        select: function( select, attrName ) {
            var attr = this.model.get("attr")[ attrName ];
            this.$( select + " option").each(function(){
                var $this = $(this); // cache this jQuery object to avoid overhead

                if ($this.val() == attr) { // if this option's value is equal to our value
                    $this.prop("selected", true); // select this option
                    return false; // break the loop, no need to look further
                }
            });
        },
        
        events : {
            'change .font-list': "changeFont",
            'change .size-list': "changeSize"
        },
        
        changeFont : function( e ) {
            this.model.visual.$('.style-font-family').contents().unwrap();
            this.model.visual.$('.inner').wrapInner('<span class="style-font-family" style="font-family:'+ $(e.target).val() +'"/>');
            this.model.update({ fontFamily : $(e.target).val() });
            this.saveContent();
            return false;
        },
        
        changeSize : function( e ) {
            this.model.visual.$el.css( 'fontSize', $(e.target).val() + '%' );
            this.model.update({ fontSize : $(e.target).val() });
            return false;
        },
        
        saveContent : function() {
            var str = this.model.visual.$el.find('#zedit-target').html();

            this.model.update({ content : str });
        },
        
        getTemplate : function() {
            var html =
            
            "<select class='font-list' style='width:49%; margin-right:2%'>"+
                "<option value='Aldrich' >Aldrich</option>"+
                "<option value='Allerta Stencil' >Allerta Stencil</option>"+
                "<option value='Antic' >Antic</option>"+
                "<option value='Archivo Black' >Archivo Black</option>"+
                "<option value='Arial' >Arial</option>"+
                "<option value='Bilbo Swash Caps' >Bilbo Swash Caps</option>"+
                "<option value='Cabin Sketch' >Cabin Sketch</option>"+
                "<option value='Codystar' >Codystar</option>"+
                "<option value='Cutive Mono' >Cutive Mono</option>"+
                "<option value='Dosis' >Dosis</option>"+
                "<option value='Ewert' >Ewert</option>"+
                "<option value='Fascinate' >Fascinate</option>"+
                "<option value='Faster One' >Faster One</option>"+
                "<option value='Finger Paint' >Finger Paint</option>"+
                "<option value='Georgia' >Georgia</option>"+
                "<option value='Great Vibes' >Great Vibes</option>"+
                "<option value='Londrina Outline' >Londrina Outline</option>"+
                "<option value='Londrina Sketch' >Londrina Sketch</option>"+
                "<option value='Monofett' >Monofett</option>"+
                "<option value='Montserrat' >Montserrat</option>"+
                "<option value='New Rocker' >New Rocker</option>"+
                "<option value='Nobile' >Nobile</option>"+
                "<option value='Nova Mono' >Nova Mono</option>"+
                "<option value='Orbitron' >Orbitron</option>"+
                "<option value='Sorts Mill Goudy' >Sorts Mill Goudy</option>"+
                "<option value='Poiret One' >Poiret One</option>"+
                "<option value='Pontano Sans' >Pontano Sans</option>"+
                "<option value='Trocchi' >Trocchi</option>"+
                "<option value='Ultra' >Ultra</option>"+
                "<option value='Verdana' >Verdana</option>"+
                "<option value='Wendy One' >Wendy One</option>"+
                "<option value='Yellowtail' >Yellowtail</option>"+
            "</select>"+

            "<select class='size-list' style='width:49%'>"+
                "<option value='100' >8</option>"+
                "<option value='125' >10</option>"+
                "<option value='150' >12</option>"+
                "<option value='175' >14</option>"+
                "<option value='200' >18</option>"+
                "<option value='250' >24</option>"+
                "<option value='375' >36</option>"+
                "<option value='500' >48</option>"+
                "<option value='800' >72</option>"+
                "<option value='1600' >144</option>"+
                "<option value='2400' >200</option>"+
                "<option value='3600' >300</option>"+
            "</select>";

            return html;
        }
        
    });
    
    Layer.Views.Lib.ColorPicker = Layer.Views.Lib.extend({
        
        className : 'control-colorpicker',
        
        defaults : {
            property : 'backgroundColor',
            color : '#FFFFFF',
            save : true,
            opacity: false,
            opacityValue : 1
        },
        
        save : function()
        {
            console.log('save rect');
            var attr = {};
            console.log(this);
            attr[ this.settings.property ] = this.settings.color;
            this.model.update( attr );
        },
        
        render : function()
        {
            var _this = this;
            
            if(this.settings.opacity&&false )
            {
                this.opacitySlider = new Layer.Views.Lib.Slider({
                    css : false,
                    property : this.settings.property +'Opacity',
                    value : this.settings[this.settings.property+'Opacity'] || this.settings.opacityValue,
                    model: this.model,
                    label : this.settings.label+' Opacity',
                    step : 0.01,
                    min : 0.05,
                    max : 1,
                    slide : function()
                    {
                        _this.refreshColor(_this.settings.color, _this.opacitySlider.getValue() );
                    }
                });
            }
            
            this.$el.append( _.template( this.getTemplate(), _.extend(this.settings,{'color':this.model.get('attr')[this.settings.property]}) ));
            
            if( this.settings.opacity &&false ) this.$el.append( this.opacitySlider.getControl() );
            
            this.initHexField();
            
            return this;
        },
        
        events : {
            'click .color-box, input' : 'initWheel',
            'click .close' : 'closeWheel'
        },
        
        initHexField : function()
        {
            var _this = this;
            this.$el.find('input').keypress(function(e){
                if(e.which == 13)
                {
                    console.log($(this).val());
                    var validHex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test( $(this).val() );
                    if( validHex )
                    {
                        $(this).effect('highlight',{},2000);
                    }
                    else
                    {
                        $(this).val('#FF00FF'); //set to a default
                        $(this).effect('highlight',{'color':'#ff0000'},2000); //blink red
                    }
                    $.farbtastic( _this.$el.find('.control-colorpicker')).setColor( $(this).val() );
                    this.lazySave();
                }
            });
        },
        
        initWheel : function()
        {
            var _this = this;
            this.$el.find('.close').show();
            
            if( this.wheelLoaded !== true )
            {
                $.farbtastic(this.$el.find('.control-colorpicker'))
                    .setColor( _this.settings.color )
                    .linkTo(function(color){
                        _this.refreshColor( color, (( _this.opacitySlider)? _this.opacitySlider.getValue() : 1 ) );
                        _this.settings.color = color;
                    });
                this.wheelLoaded = true;
            }
            else
            {
                this.$el.find('.control-colorpicker').show();
                
            }
        },
        
        closeWheel : function()
        {
            this.$el.find('.close').hide();
            this.$el.find('.control-colorpicker').hide();
        },
        
        refreshColor : function( hex, a )
        {
            this.model.visual.$el.css( this.settings.property, 'rgba('+ hex.toRGB() +','+ a +')' );
            this.$el.find('.color-box').css( 'background-color', hex );
            this.$el.find('input').val( hex );
            if(this.settings.save) this.lazySave();
        },
        
        lazySave : _.debounce( function(){
            var attr = {};
            attr[ this.settings.property ] = this.settings.color;
            this.model.update( attr );
        }, 1000),
        
        getTemplate : function()
        {
            var html =
            
                    "<div class='input-prepend input-append'>"+
                        "<span class='control-name'>Color</span>"+
                        "<input  class='add-on color-box' style='margin-left:64px; border:none; text-transform:uppercase; background-color:<%= color %>' id='prependedInput' class='span1' type='text' size='16' value='<%= color %>'/>"+
                        //"<span class='add-on color-box' style='background-color:<%= color %>'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"+
                    "</div>"+
                    '<a class="close" style="display:none; color:white;">hide</a>'+
                    "<div class='control-colorpicker'></div>";
            
            return html;
        }
    });
    
    Layer.Views.Lib.GoogleMaps = Layer.Views.Lib.extend({
        
        className : 'control control-google-map',
        
        defaults : {
            
            mapWidth : 268,
            mapHeight : 268,
            
            type : 'map',
            streetView : true,
            searchBar : true,
            disableDoubleClickZoom : true,
            scrollwheel: false,
            panControl: false,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
        },
        
        init : function()
        {
            
            //console.log(this.model)
            /*
            this.model.on("all", function(eventName) {
                console.log('event: '+ eventName);
            });
            */
        },
        
        onControlsOpen : function()
        {
            this.initMap();
        },
        
        initMap : function()
        {
            console.log('geo layer open');
            console.log(this);
            if( this.loaded !== true )
            {
                //make center lat lng
                var center = new google.maps.LatLng( this.model.get('attr').lat, this.model.get('attr').lng);

                var gMapType = google.maps.MapTypeId[ this.model.get('attr').mapType.toUpperCase() ];

                var mapOptions = {
                    zoom : this.model.get('attr').zoom,
                    center : center,
                    mapTypeId : gMapType,
                    
                    disableDoubleClickZoom : this.settings.disableDoubleClickZoom,
                    panControl: this.settings.panControl,
                    zoomControl: this.settings.zoomControl,
                    mapTypeControl: this.settings.mapTypeControl,
                    scaleControl: this.settings.scaleControl,
                    streetViewControl: false,
                    scrollwheel: false,
                    overviewMapControl: this.settings.overviewMapControl
                };
                this.map = new google.maps.Map( $(this.el).find( '.google-map' )[0], mapOptions);
                this.marker = new google.maps.Marker({
                      position: center,
                      map: this.map
                      

                  });
                this.marker.setDraggable(true);
                /*
                if( this.model.get('attr').type == "streetview" )
                {
                    var pov = {
                            'heading' : this.model.get('attr').heading,
                            'pitch' : this.model.get('attr').pitch,
                            'zoom' : this.model.get('attr').streetZoom,
                            }
                    this.map.getStreetView().setPosition( center );
                    this.map.getStreetView().setPov( pov );
                    this.map.getStreetView().setVisible( true );
                }
                */
                
                
                  var streetViewLayer = new google.maps.ImageMapType({
                    getTileUrl : function(coord, zoom) {
                      return "http://www.google.com/cbk?output=overlay&zoom=" + zoom + "&x=" + coord.x + "&y=" + coord.y + "&cb_client=api";
                    },
                    tileSize: new google.maps.Size(256, 256)
                  });
                  
                this.map.overlayMapTypes.insertAt(0, streetViewLayer);
                this.initMapListeners();
                this.initGeoCoder();
                
                this.loaded = true;
            }
        },
        
        initGeoCoder : function()
        {
            var _this = this;
            this.geocoder = new google.maps.Geocoder();
            
            $(this.el).find('.geocoder').keypress(function(e){
                if(e.which == 13)
                {
                    _this.lookup( $(this).val() );
                    $(this).blur();
                    return false;
                }
            }).blur(function(){
                _this.lookup( $(this).val() );
            });
        },
        
        lookup : function( location )
        {
            console.log('lookup: '+location);
            var _this = this;
            this.geocoder.geocode( { 'address': location}, function(results, status) {
                if ( status == google.maps.GeocoderStatus.OK )
                {
                    if( _this.map.getStreetView().getVisible() ) _this.map.getStreetView().setVisible( false );
                    var center = results[0].geometry.location;
                    _this.map.setCenter( center );
                    _this.marker.setPosition(center);
                    _this.model.update({
                        title : location,
                        lat : center.lat(),
                        lng : center.lng()
                    });
                    _this.model.trigger('update');
                    console.log('new geocoded location');
                }
                else alert("Geocoder failed at address look for "+ input.val()+": " + status);
            });
            
            
        },
        
        initMapListeners : function()
        {
            var _this = this;
            google.maps.event.addListener( this.map, 'idle', function(){
                /*
                var newCenter = _this.map.getCenter();
                console.log('map is idle now')
                
                _this.model.update({
                    lat : newCenter.lat(),
                    lng : newCenter.lng()
                })
                _this.model.trigger('update');
                */
            });
            
             google.maps.event.addListener(this.marker, 'dragend', function(){
             
                 var newCenter = _this.marker.getPosition();
                console.log('map is idle now');
                
                _this.model.update({
                    lat : newCenter.lat(),
                    lng : newCenter.lng()
                });
                //_this.model.trigger('update');
             });


            google.maps.event.addListener(this.map, 'maptypeid_changed', function(){
                console.log('the maps type has changed');
                _this.model.update({ mapType : _this.map.getMapTypeId() });
            });
            
            google.maps.event.addListener( this.map , 'zoom_changed', function(){
                console.log('map zoom level changed');
                _this.model.update({ zoom : _this.map.getZoom() });
            });
            
            google.maps.event.addListener( this.map.getStreetView(), 'visible_changed', function(){
                
                console.log('streetview changed');
                if( _this.map.getStreetView().getVisible() )
                {
                    var center = _this.map.getStreetView().getPosition();
                    console.log(center.lat() +':'+ center.lng() );

                    //when streetview is visible
                    _this.model.update({
                        type : 'streetview',
                        lat : center.lat(),
                        lng : center.lng(),
                        heading : _this.map.getStreetView().getPov().heading,
                        pitch : _this.map.getStreetView().getPov().pitch,
                        streetZoom : Math.floor( _this.map.getStreetView().getPov().zoom )
                    });
                }
                else
                {
                    //when streetview is hidden
                    _this.model.update({ type: 'map' });
                }
                
                //_this.model.trigger('update');
            });
            
            //called when the streetview is panned
            google.maps.event.addListener( _this.map.getStreetView(), 'pov_changed', function(){
                delayedUpdate();
            });

            // need this so we don't spam the servers
            var delayedUpdate = _.debounce( function(){
                var center = _this.map.getStreetView().getPosition();
                var pov = _this.map.getStreetView().getPov();
                
                console.log('streetview moved');
                
                _this.model.update({
                    heading : pov.heading,
                    lat : center.lat(),
                    lng : center.lng(),
                    pitch : pov.pitch,
                    streetZoom : Math.floor( pov.zoom )
                });
                
            } , 1000);
        },
        
        
        onControlsClosed : function()
        {
            console.log('geo layer closed');
        },
        
        save : function()
        {
            console.log('save rect');
            var attr = {};
            console.log(this);
            //attr[ this.settings.property ] = this.settings.color;
            //this.model.update( attr )
        },
        
        onLayerEnter : function()
        {
            if( $(this.el).find( '.google-map' ).is(':visible') ) this.onControlsOpen();
        },
        
        onLayerExit : function()
        {
            this.map = {};
            $(this.el).find( '.google-map' ).empty();
            this.loaded = false;
        },
        
        render : function()
        {
            var _this = this;

            this.$el.append( _.template( this.getTemplate(), this.settings ));
            
            
            return this;
        },
        
        lazySave : _.debounce( function(){
            var attr = {};
            attr[ this.settings.property ] = this.settings.color;
            this.model.update( attr );
        }, 3000),
        
        getTemplate : function()
        {
            var html =
            
                    "<div class='google-map' style='width:<%= mapWidth %>px; height:<%= mapHeight %>px'></div>"+
                    "<input class='geocoder' type='text' placeholder='type a place name'>";
            
            return html;
        }
    });
    
    
})(zeega.module("layer"));