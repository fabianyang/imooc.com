$(function() {
    $('svg[data-src]').each(function(index, svg) {
        var src = $(svg).data('src');
        $.ajax({
            url: src,
            dataType: 'xml',
            success: function(content) {
                var doc = content.documentElement;
                $(doc).attr({
                    width: $(svg).attr('width'),
                    height: $(svg).attr('height')
                });
                $(svg).after(doc).remove();
            }
        })
    });
});