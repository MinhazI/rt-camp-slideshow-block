<?php

// Retrieve attributes
$sliderBlogUrl = $attributes['sliderBlogUrl'];

// Fetch posts from external URL
$posts_response = wp_remote_get($sliderBlogUrl . '/wp-json/wp/v2/posts');
if (!is_wp_error($posts_response) && $posts_response['response']['code'] === 200) {
    $posts = json_decode($posts_response['body']);
    // Check if posts are fetched successfully
    if (empty($posts)) {
        return '<p>No posts found. Please check the blog link.</p>';
    }
} else {
    return '<p>Failed to fetch posts from the blog.</p>';
}

$sliderBlogUrl = $attributes['sliderBlogUrl'];
?>
<div class="slider-block">
    <div class="slideshow-container">
        <?php foreach ($posts as $post) : setup_postdata($post);
            $featured_image_response = wp_remote_get($sliderBlogUrl . '/wp-json/wp/v2/media/' . $post->featured_media);

            if (is_wp_error($featured_image_response)) {
                $featured_image_url = "none";
            } else {
                $featured_image_response_array = json_decode(wp_remote_retrieve_body($featured_image_response), true);

                if (!empty($featured_image_response_array['guid']['rendered'])) {
                    $featured_image_url = $featured_image_response_array['guid']['rendered'];
                } else {
                    $featured_image_url = "none";
                }
            }
        ?>
            <div class="slide" style="<?php if ($attributes['sliderDisplayImage']) : ?>background-image: url('<?php echo $featured_image_url;
                                                                                                            endif; ?>'); background-size: cover; background-position: center; position: relative">
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
        <?php if ($attributes['sliderDisplayArrows']) : ?>
            <a class="prev"><span class="dashicons dashicons-arrow-left-alt"></span></a>
            <a class="next"><span class="dashicons dashicons-arrow-right-alt"></span></a>
        <?php endif; ?>
        <?php if ($attributes['sliderDisplayNavigation']) : ?>
            <div class="navigation-container">
                <?php foreach ($posts as $post) : setup_postdata($post); ?>
                    <span class="navigation"></span>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div>
<?php
wp_reset_postdata();
