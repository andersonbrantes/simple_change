/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "simpleChange",
        defaults = {
            itemsPerPage: 1,
            showControls: true,
            showNavigation: true,
            navigationPosition: "bottom",
            infinite: false,
            effectType: "scrollLeft"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.conteudoWidth = $(this.element).width();
        this.widthItensConteudo = Math.floor(this.conteudoWidth / this.options.itemsPerPage);
        this.totalItens = $(this.element).find('.sc-item').length;
        this.maxIndex = Math.ceil(this.totalItens / this.options.itemsPerPage);

        this.init();
    }

    Plugin.prototype = {
        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            this.createControls(this.options.showControls);
            this.createNavigation(this.options.showNavigation);
        },

        createControls: function(showControls) {
          if (showControls === true) {
            $('<div/>', { class: 'sc-controls' }).prependTo(this.element);

            var controlsContainer = $(this.element).find('.sc-controls');
            $('<span/>', { class: 'sc-controls-btn sc-prev' }).appendTo(controlsContainer);
            $('<span/>', { class: 'sc-controls-btn sc-next' }).appendTo(controlsContainer);
          }
        },

        createNavigation: function(showNavigation) {
          if (showNavigation === true) {

            $('<div/>', { class: 'sc-navigation' }).appendTo(this.element);

            var navigationContainer = $(this.element).find('.sc-navigation');
            this.createNavigationItems(navigationContainer, this.maxIndex);
          }
        },

        createNavigationItems: function(navigationCont, maxIndex) {
          for(i = 0; i < maxIndex; i++ ) {
            jQuery('<span/>', {
              id: 'sc-navigation-item-' + i,
              class: 'sc-controls-btn sc-navigation-item',
              'data-item': i,
            }).appendTo(navigationCont);
          }
          navigationCont.find('.sc-navigation-item').first().addClass('active');
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
