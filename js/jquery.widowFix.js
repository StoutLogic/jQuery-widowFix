/*
 * jQuery WidowFix Plugin
 * http://matthewlein.com/widowfix/
 * Copyright (c) 2010 Matthew Lein
 * Version: 1.3.2 (7/23/2011)
 * Dual licensed under the MIT and GPL licenses
 * Requires: jQuery v1.4 or later
 */


(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function( $ ){

	$.fn.widowFix = function(userOptions) {

		var defaults = {
			letterLimit: null,
			prevLimit: null,
			linkFix: false
		};

		var wfOptions = $.extend(defaults, userOptions);

		if (this.length) {

			return this.each(function(){

				var $this = $(this);
				var linkFixLastWord;
				
				if ( wfOptions.linkFix ) {
					var $linkHolder = $this.find('a:last');
					//find the anchors and wrap them up with a <var> tag to find it later
					$linkHolder.wrap('<var>');
					//store the anchor inside
					var $lastLink = $('var').html();
					//get the real length of the last word
					linkFixLastWord = $linkHolder.contents()[0];
					//remove the anchor
					$linkHolder.contents().unwrap();
				}

				var contentArray = $(this).html().split(' '),
					lastWord = contentArray.pop();

				if (contentArray.length <= 1) {
					// it's a one word element, abort!
					if (wfOptions.linkFix) {
						replaceLink();
					}
					return;
				}

				function checkSpace(){
					if (lastWord === ''){
						// trailing space found, pop it off and check again
						lastWord = contentArray.pop();
						checkSpace();
					}
				}
				checkSpace();

				function replaceLink() {
					if (wfOptions.linkFix) {
						// Replace our temporary <var> tag with the orginal <a> tag
						$this.find('var').each(function(){
							$(this).contents().replaceWith($lastLink);
							$(this).contents().unwrap();
						});
					}
				}
				
				var prevWord = contentArray[contentArray.length-1];

				//if the last word is longer than the limit, stop the script
				if (wfOptions.letterLimit !== null &&
						linkFixLastWord.length >= wfOptions.letterLimit) 
				{
						replaceLink();
						return;
				} 

				//or if the prev word is longer than the limit
				else if (wfOptions.prevLimit !== null &&
						   	 prevWord.length >= wfOptions.prevLimit) 
				{
						replaceLink();
						return;
				}

				var content = contentArray.join(' ') + '&nbsp;' + lastWord;
				$this.html(content);				
				replaceLink();
			});

		}

	};

}));
