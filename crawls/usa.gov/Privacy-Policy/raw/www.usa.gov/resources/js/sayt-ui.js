if (usagov_sayt_url === undefined) {
    var usagov_sayt_url = "http://search.usa.gov/sayt?";
}

function monkeyPatchAutocomplete() {
    var oldFn = jQuery.ui.autocomplete.prototype._renderItem;

    jQuery.ui.autocomplete.prototype._renderItem = function(ul, item) {
        var re = new RegExp("^" + this.term);
        var t = item.label.replace(re, "<span style='color:#444444;font-weight:normal;'>" + this.term + "</span>");
        return jQuery("<li></li>")
                .data("item.autocomplete", item)
                .append("<a>" + t + "</a>")
                .appendTo(ul);
    };
}

jQuery(document).ready(function() {
    monkeyPatchAutocomplete();
    var position = { my: "left top", at: "left bottom", of: "#home_search", offset: "15 0", collision: "none" };
    jQuery(".usagov-search-autocomplete").autocomplete({
        source: function(request, response) {
            jQuery.ajax({
                url: usagov_sayt_url + "q=" + encodeURIComponent(request.term),
                dataType: "jsonp",
                /*data: {
                    featureClass: "P",
                    style: "full",
                    maxRows: 12,
                    name_startsWith: request.term
                },*/
                success: function(data) {
                    response(jQuery.map(data, function(item) {
                        return {
                            label: item,
                            value: item
                        }
                    }));
                }
            });
        },
        minLength: 2,
        delay: 50,
        select: function(event, ui) {
            jQuery(".usagov-search-autocomplete").val(ui.item.value.toString());
            jQuery("#sc").val("1");
            jQuery(this).closest('form').submit();
        },
        open: function() {
            jQuery('.ui-autocomplete').removeClass('ui-corner-all').addClass('ui-corner-bottom usagov_autocomplete');
            jQuery('.ui-autocomplete').css({ width: '400px', 'z-index': 100 });
        },
        position: position
    });
});
