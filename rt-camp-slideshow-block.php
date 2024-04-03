<?php

/**
 * Plugin Name:       rtCamp Slideshow Block
 * Description:       Gutenberg Slideshow Block for WordPress Posts assignment from rtCamp
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Minhaz I Mohamed
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rt-camp-slideshow-block
 *
 * @package minhaz-mohamed
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function rt_camp_slideshow_block_rt_camp_slideshow_block_block_init()
{
	register_block_type(
		__DIR__ . '/build'
	);
}
add_action('init', 'rt_camp_slideshow_block_rt_camp_slideshow_block_block_init');

function register_block_category($categories)
{
	$categories[] = array(
		'slug'  => 'rtcamp-assignment-category',
		'title' => 'rtCamp Assignment Category'
	);

	return $categories;
}

if (version_compare(get_bloginfo('version'), '5.8', '>=')) {
	add_filter('block_categories_all', 'register_block_category');
} else {
	add_filter('block_categories', 'register_block_category');
}

add_action('rest_api_init', 'register_custom_endpoint');

function register_custom_endpoint()
{
	register_rest_route('rtcamp-slideshow/v1', '/fetch-posts', array(
		'methods'  => 'POST',
		'callback' => 'fetch_posts_api_callback',
	));
}

function fetch_posts_api_callback($request)
{
	$params = $request->get_params();

	$default_site_url = get_bloginfo('url');
	$slider_blog_url = isset($params['sliderBlogUrl']) ? $params['sliderBlogUrl'] : $default_site_url;

	if (!empty($slider_blog_url) && strpos($slider_blog_url, 'https://') !== 0 && $slider_blog_url !== $default_site_url) {
		$slider_blog_url = 'https://' . $slider_blog_url;
	}

	$posts_response = wp_remote_get($slider_blog_url . '/wp-json/wp/v2/posts');

	if (!is_wp_error($posts_response) && wp_remote_retrieve_response_code($posts_response) === 200) {
		$posts_data = json_decode(wp_remote_retrieve_body($posts_response));

		if (empty($posts_data)) {
			$response = array(
				'error'   => true,
				'message' => 'No posts found. Please check the blog link.'
			);
		} else {
			$response = array(
				'error' => false,
				'posts' => $posts_data
			);
		}
	} else {
		$response = array(
			'error'   => true,
			'message' => 'Failed to fetch posts from the blog.'
		);
	}

	return rest_ensure_response($response);
}

function rt_camp_slideshow_block_enqueue_assets()
{
	// Enqueue WordPress dashicons stylesheet
	wp_enqueue_style('dashicons');
}
add_action('enqueue_block_editor_assets', 'rt_camp_slideshow_block_enqueue_assets');

function rt_camp_slideshow_block_register()
{
	register_block_type('rtcamp-assignment-category/slideshow');
}
add_action('init', 'rt_camp_slideshow_block_register');
