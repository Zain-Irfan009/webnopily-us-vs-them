if ('undefined' == typeof window.jQuery) {
    var script_cdn = document.createElement('script');
    script_cdn.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    document.getElementsByTagName('body')[0].appendChild(script_cdn);
}

setTimeout(my_fun, 1000);
function my_fun() {

        $.ajax({

            url: 'https://phpstack-362288-3089196.cloudwaysapps.com/update-count?template_id={{  xc_settings.template_id }}&shop={{  shop.domain}}',
            type: 'GET',
            success:function(data){
            },
        });

}
