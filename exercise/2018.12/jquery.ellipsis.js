/// <reference path="jquery-1.9.1.intellisense.js" />
/// author: Think Tam @2013-5-15

(function($) {
    function ellipsis($elem, options) {
        var max = options.maxWidth,  // 120
            ellipsis_char = options.ellipsisChar;  // 0
        if (!max) {
            max = $elem.width();
        }

        max = max * options.maxLine;  // 120 * 2
        var text = $.trim($elem.text()).replace(' ', '　'); //for fix white-space bug　

        var $temp_elem = $elem.clone(false)
            .css({
                "visibility": "hidden",
                "whiteSpace": "nowrap",
                "width": "auto"
            })
            .appendTo(document.body);
        var width = $temp_elem.width();  // 克隆出来的宽度
        if (width > max) {
            var stop = Math.floor(text.length * max / width); // for performance while content exceeding the limit substantially
            var temp_str = text.substring(0, stop) + ellipsis_char;
            width = $temp_elem.text(temp_str).width();   // 这里的宽度是 加了裁剪后加了... 后  的宽度
            
            if (width > max) {
                while (width > max && stop > 1) {
                    stop--;
                    temp_str = text.substring(0, stop) + ellipsis_char;
                    width = $temp_elem.text(temp_str).width();
                }

            } else if (width < max) {
                while (width < max && stop < text.length) {
                    stop++;
                    temp_str = text.substring(0, stop) + ellipsis_char;
                    width = $temp_elem.text(temp_str).width();
                }
                if (width > max) {
                    temp_str = text.substring(0, stop - 1) + ellipsis_char;
                }
            }
            $elem.text(temp_str.replace('　', ' '));


        }
        $temp_elem.remove();
    }


    var defaults = {
        maxWidth: 0,
        maxLine: 1,
        ellipsisChar: '...'
    };

    $.fn.ellipsis = function(options) {
        return this.each(function() {
            var $elem = $(this);
            
            console.log(options);
            var opts = $.extend({}, defaults, options);
            console.log(opts);

            ellipsis($elem, opts);
        });
    };

    //$.fn.ellipsis.options = defaults;
})(jQuery);