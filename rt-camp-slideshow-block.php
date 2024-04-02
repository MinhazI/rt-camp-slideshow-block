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


function rt_camp_slideshow_block_register()
{
	register_block_type('rtcamp-assignment-category/slideshow');
}
add_action('init', 'rt_camp_slideshow_block_register');
