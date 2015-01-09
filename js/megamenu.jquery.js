
;(function ( $, window, document, undefined ) {

	var 
		pluginName = "megaMenu",
		defaults = {
			offsetLeft: 0,				// A negative left margin
			interval: 200,
			sensitivity: 4,
			timeout: 200
		};
	
	function MegaMenu (element, options) {
		this.element 	= element;
		this.obj 		= $(this.element);
		this.options 	= $.extend( {}, defaults, options );
		this.defaults 	= defaults;
		this.name 		= pluginName;
		init.apply(this);
	}

	/******************* 
		Private methods 
	  		There is simply no need to expose these
	*/
	var init = function() {

		setElements.apply(this);
		start.apply(this);
	}
	var setElements = function() {
		this.topLevelItems 		= $(".menu-top", this.obj);
		this.megaMenues			= $(".sub-menu", this.obj);
	}
	var setEvents = function() {
		var $this = this;
	}
	var start = function() {
		var $this = this;
		this.topLevelItems.each(function(){
			var obj = $(this);
			if(obj.find('.sub-menu')) {
				$this.applyHoverIntent(obj)
			}
		})
	}

	/******************* 
		Public Methods 
	*/
	MegaMenu.prototype.applyHoverIntent = function(obj)
	{
		var 
			$this 	= this,
			menu 	= obj.find('.sub-menu');
				
		obj.hoverIntent({
			 interval: this.options.interval,
			 sensitivity: this.options.sensitivity,
			 timeout: this.options.timeout,
			 over: function(){

			 	$this.show(obj, menu)
			 },
			 out: function(){
			 	$this.hide(obj, menu)
			 }
		});
                if(menu.find('.tabs').length) {
			this.tabs(obj, menu);
		}
	}
	MegaMenu.prototype.tabs = function(obj, menu)		
	{
		var 
			$this 	= this,
			tabs =  menu.find('.tabs'),
			tabitems = menu.find('.tab-item');

		tabs.find('li').click(function() {
			var activeitem = $(this).find('a').attr('href');
			tabs.find('li').removeClass('active');
			$(this).addClass('active');
			tabitems.removeClass('tab-active');
			menu.find(activeitem).addClass('tab-active');
		});
	},
	MegaMenu.prototype.show = function(obj, menu)
	{
		obj.addClass("is-active");
		menu.animate({
			opacity: 1,
			top: '45px',
		}, 200,'easeOutCirc', function() {
			//
		}).css({
			'display': 'block',
		});
	}
	MegaMenu.prototype.hide = function(obj, menu)
	{
		obj.removeClass("is-active");
		menu.animate({
			opacity: 0,
			top: '100px',
		}, 200, 'easeOutCirc', function() {
			$(this).css({display: 'none'})
		});
	}
	MegaMenu.prototype.menuPosition = function(obj, menu)
	{
		var 
			pos 		= obj.position(),
			overWidth 	= pos.left+menu.width(),
			bodyWidth	= $('body').width();

		return (this.options.offsetLeft + (overWidth > bodyWidth ? overWidth - bodyWidth : 0))	
	}

	/**************
		Constructor
	*/	
	$.fn[pluginName] = function (options) {
		return this.each(function() {
			if (!$.data(this, pluginName)) {
				$.data(this, pluginName, new MegaMenu(this, options));
			}
		});
	};

})(jQuery, window, document);




/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery);
