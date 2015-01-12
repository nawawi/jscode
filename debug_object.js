/**
 * Prints human-readable information about a variable
 * Original code from phpjs print_r function
 *
 * @param array array
 * @return string Returns the information.
 */
function dump_object(array) {
    var pad_char = ' ', pad_val = 2

    function repeat_char(len, pad_char) {
        var str = '';
        for (var i = 0; i < len; i++) {
            str += pad_char;
        }
        return str;
    };

    function formatArray(obj, cur_depth, pad_val, pad_char) {
        if (cur_depth > 0) {
            cur_depth++;
        }

        var base_pad = repeat_char(pad_val * cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
        var str = '';

        if (typeof obj === 'object' && obj !== null && obj.constructor) {
            str += 'Array\n' + base_pad + '(\n';
            for (var key in obj) {
                str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char) + '\n';
            }
            str += base_pad + ')\n';
        } else if (obj === null || obj === undefined) {
            str = '';
        } else {
            str = obj.toString();
            if ( str.match(/function\s/) ) {
                str = str.replace(/\n|\t|\r|\s\s\s\s/g,'');
            }
        }

        return str;
    };

    return formatArray(array, 0, pad_val, pad_char);
};

/**
 * Convert object to human-readable string
 *
 * @param object Array or Object
 * @return void
 */
function _debug_object(data, focus) {
    focus = focus || false;
    var debugwin = open("","debug_object_win");
    var html = "<html><head><title>Debug Object</title></head><body scroll='auto'>";
    html += "<pre>"+dump_object(data)+"</pre>";
    html += "</body></html>";
    debugwin.document.write(html);
    if ( focus ) {
        debugwin.focus();
    }
    delete data;
};

