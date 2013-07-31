jQuery( document ).ready( function($) {

    // Function used to grab the News articles from news.google.com. It uses json and loads the
    // articles into the results div.
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
                if ( json.responseStatus != 200 ) {
                    var error = '<div class="error">* Sorry a problem occured. Please try again later.</div>'
                    $( '.google-search-results' ).html( error );
                } else {
                    var news_items = json.responseData.feed.entries;
                    var i = 0;
                    $( '.google-search-results' ).html( '' );
                    $( news_items ).each( function () {
                        // Sorry for this part. The content returned was already formatted but
                        // wasn't playing nice so I had to modify it. I realize this
                        // is not the best way to format this content, but it was faster than
                        // reformatting it from scratch.

                        var bad_div = 'font-size:85%;font-family:arial,sans-serif"><br><div ' +
                                    'style="padding-top:0.8em"><img alt="" height="1" width="1"></div>';
                        var new_content = news_items[i].content
                                        .replace(bad_div,'font-size:120%;font-family:arial,sans-serif">');
                        $( '.google-search-results' ).append( new_content );
                        i++;
                    })
                }
            },
            error: function() {
                var error = '<div class="error">* Sorry a problem occured. Please try again later.</div>'
                $( '.google-search-results' ).html( error );
            }
        });
    }

    // This is to be called when the page loads. It tests if the search text box has the
    // default text in it, if not then it calls the getNews function on the text in the box.
    // This is used for the optional shortcode parameters.
    if ( $( ".google-search-text" ).val() != "Search Google News" ) {
        var search = $( '.google-search-text' ).val();
        var num_articles = $( '.google-search-num-articles' ).val();
        getNews( search, num_articles );
    }

    // This function is to gather the search data when the search button is
    // pressed and call the getNews function.
    $( ".google-search-button" ).click( function(event) {
        event.preventDefault();
        $( '.google-search-results' ).html( '' );
        var search = $( '.google-search-text' ).val();
        var num_articles = $( '.google-search-num-articles' ).val();
        getNews( search, num_articles );
    })

    // This is to empty the search text box if its clicked and has the default statement.
    $( ".google-search-text" ).focus(function() {
        if ( $( this ).val() == 'Search Google News' ) {
            $( this ).val( '' );
        }
    })

    // This is to reassign the default statement into the search text box if the
    // box is empty when the user clicks or tabs away.
    $( ".google-search-text" ).blur( function() {
        if ( $( this ).val() == '' ) {
            $( this ).val( 'Search Google News' );
        }
    })
    // This function is just used to make sure the enter button submits the search.
    $( "input.google-search-text" ).bind( "keydown", function(event) {
        // track enter key
        var keycode = ( event.keyCode ? event.keyCode : ( event.which ? event.which : event.charCode));
        if ( keycode == 13 ) { // key code for enter key
            // force the 'Enter Key' to implicitly click the Add items button
            $( '.google-search-button' ).click();
            return false;
        } else  {
            return true;
        }
    });
});
