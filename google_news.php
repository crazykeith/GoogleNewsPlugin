<?php
/**
 * Plugin Name: Keith's Google News Plugin
 * Plugin URI: https://github.com/crazykeith/GoogleNewsPlugin
 * Description: Adds a google news search to a page and shows the results of the search.
 * Author: Keith Barker
 * Version: 1.0
 * Author URI: https://github.com/crazykeith
 */

/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

function add_stylesheet() {
    wp_register_style( 'myCSS', plugins_url('google_news.css', __FILE__) );
    wp_enqueue_style( 'myCSS' );
}

function add_javascript() {
    wp_enqueue_script( 'myJS', plugins_url('google_news.js', __FILE__), array( 'jquery' ) );
}

function google_news_shortcode($atts) {

    extract( shortcode_atts( array(
        'search' => 'Search Google News',
        'num_articles' => '5',
    ), $atts ) );

    return '<div class="google-news">
                <h2><img src="https://ssl.gstatic.com/news-static/img/logo/en_us/news.gif"></h2>
                <input class="google-search-text"
                       value="' . sanitize_text_field($search) . '" type="text" />
                <input type="hidden" name="num_articles"
                       class="google-search-num-articles"
                       value="' . sanitize_text_field($num_articles) . '">
                <input type="button" name="submit"
                       class="button google-search-button"
                       value="Search">
                <div class="google-search-results"></div>
            </div>';
}

add_action( 'wp_enqueue_scripts', 'add_stylesheet' );
add_action( 'wp_enqueue_scripts', 'add_javascript' );
add_shortcode( 'google-news','google_news_shortcode' );