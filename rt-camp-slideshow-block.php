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
		__DIR__ . '/build',
		array(
			'render_callback' => 'rt_camp_slideshow_block_render',
		)
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

function rt_camp_slideshow_block_render($attributes)
{
	// Retrieve attributes
	$sliderBlogUrl            = $attributes['sliderBlogUrl'];

	// Fetch posts from external URL
	$external_posts = wp_remote_get($sliderBlogUrl . '/wp-json/wp/v2/posts');
	if (!is_wp_error($external_posts) && $external_posts['response']['code'] === 200) {
		$external_posts = json_decode($external_posts['body']);
		// Check if posts are fetched successfully
		if (!empty($external_posts)) {
			return render_slider_block($external_posts, $attributes);
		} else {
			return '<p>No posts found. Please check the external blog link.</p>';
		}
	} else {
		return '<p>Failed to fetch posts from the external blog.</p>';
	}
}

function render_slider_block($posts, $attributes)
{
	// Start building the output
	ob_start();
?>
	<div class="slider-block">
		<div class="slideshow-container">
			<?php foreach ($posts as $post) : setup_postdata($post); ?>
				<div class="slide">
					<?php if ($attributes['sliderDisplayTitle']) : ?>
						<h3><?php echo esc_html($post->title->rendered); ?></h3>
					<?php endif; ?>
					<?php if ($attributes['sliderDisplayDate']) : ?>
						<p><?php the_date(); ?></p>
					<?php endif; ?>
					<?php if ($attributes['sliderDisplayAuthor']) : ?>
						<p><?php the_author(); ?></p>
					<?php endif; ?>
					<?php if ($attributes['sliderDisplayCategories']) : ?>
						<div>Categories: <?php the_category(', '); ?></div>
					<?php endif; ?>
					<?php if ($attributes['sliderDisplayExcerpt']) : ?>
						<p><?php echo $post->excerpt->rendered ?></p>
					<?php endif; ?>
					<?php if ($attributes['sliderShowReadMoreButton']) : ?>
						<a href="<?php echo $post->link ?>" class="readmore-btn">Read More</a>
					<?php endif; ?>
				</div>
			<?php endforeach; ?>
		</div>
		<?php if ($attributes['sliderDisplayArrows']) : ?>
			<a class="prev">Previous</a>
			<a class="next">Next</a>
		<?php endif; ?>
		<?php if ($attributes['sliderDisplayNavigation']) : ?>
			<div class="navigation-container">
				<?php foreach ($posts as $post) : setup_postdata($post); ?>
					<span class="navigation"></span>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
<?php
	wp_reset_postdata();
	return ob_get_clean();
}

function rt_camp_slideshow_block_register()
{
	register_block_type('rtcamp-assignment-category/slideshow', array(
		'render_callback' => 'rt_camp_slideshow_block_render',
	));
}
add_action('init', 'rt_camp_slideshow_block_register');
