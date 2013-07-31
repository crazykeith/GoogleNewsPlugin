jQuery( document ).ready( function($) {
    function getNews( search, num_articles ) {
        if ( search == 'Search Google News' ) {
            search = '';
        }
        var url = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=' +
                'https://news.google.com/news/feeds?q='+search+'&output=rss&num='+num_articles;
        var loading_url = '<img src="/wp-content/plugins/Keiths-Google-News/loading.gif"' +
                        'class="loading" alt="loading..."> ';

        $( '.google-search-results' ).html(loading_url);

        $.ajax({
            type: "GET",
            url: url,
            dataType:'jsonp',
            success: function( json ) {
                var news_items = json.responseData.feed.entries;
                var i = 0;
                $( '.google-search-results' ).html( '' );
                $( news_items ).each( function () {
                    // Sorry for this part. The content returned was already formated but
                    // wasn't playing nice so I had to modify it. I realize this
                    // is not the best way to format this content, but it was faster than
                    // reformating it from scratch.

                    var bad_div = 'font-size:85%;font-family:arial,sans-serif"><br><div ' +
                                'style="padding-top:0.8em"><img alt="" height="1" width="1"></div>';
                    var new_content = news_items[i].content
                                    .replace(bad_div,'font-size:120%;font-family:arial,sans-serif">');
                    $( '.google-search-results' ).append( new_content );
                    i++;
                })
            }
        });
    }
    if ( $( ".google-search-text" ).val() != "Search Google News" ) {
        var search = $( '.google-search-text' ).val();
        var num_articles = $( '.google-search-num-articles' ).val();
        getNews( search, num_articles );
    }
    $( ".google-search-button" ).click( function(event) {
        event.preventDefault();
        $( '.google-search-results' ).html( '' );
        var search = $( '.google-search-text' ).val();
        var num_articles = $( '.google-search-num-articles' ).val();
        getNews( search, num_articles );
    })

    $( ".google-search-text" ).focus(function() {
        if ( $( this ).val() == 'Search Google News' ) {
            $( this ).val( '' );
        }
    })
    $( ".google-search-text" ).blur( function() {
        if ( $( this ).val() == '' ) {
            $( this ).val( 'Search Google News' );
        }
    })
    // This function is just used to make sure the enter button submits the search.
    $( "input.google-search-text" ).bind( "keydown", function(event) {
        // track enter key
        var keycode = ( event.keyCode ? event.keyCode : ( event.which ? event.which : event.charCode));
        if ( keycode == 13 ) { // keycode for enter key
            // force the 'Enter Key' to implicitly click the Add items button
            $( '.google-search-button' ).click();
            return false;
        } else  {
            return true;
        }
    }); // end of function
})