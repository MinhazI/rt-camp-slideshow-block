<?php

$default_site_url = get_bloginfo('url');
$slider_blog_url = $attributes['sliderBlogUrl'] ? $attributes['sliderBlogUrl'] : $default_site_url;

if (!empty($slider_blog_url) && strpos($slider_blog_url, 'https://') !== 0 && $slider_blog_url !== $default_site_url) {
    $slider_blog_url = 'https://' . $slider_blog_url;
}

$posts_response = wp_remote_get($slider_blog_url . '/wp-json/wp/v2/posts');


if (!is_wp_error($posts_response) && $posts_response['response']['code'] === 200) {
    $posts = json_decode($posts_response['body']);
    if (empty($posts)) {
        return '<p>No posts found. Please check the blog link.</p>';
    }
} else {
    return '<p>Failed to fetch posts from the blog.</p>';
}

?>
<div class="slider-block">
    <div class="slideshow-container">
        <?php foreach ($posts as $post) : setup_postdata($post);
            $featured_image_response = wp_remote_get($slider_blog_url . '/wp-json/wp/v2/media/' . $post->featured_media);

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
                <?php if ($attributes['sliderDisplayImage']) : ?>
                    <a href="<?php echo $post->link ?>" target="_blank" class="featured-image">
                        <img src="<?php echo $featured_image_url; ?>" alt="<?php echo esc_html($post->title->rendered); ?>" width="100%" />
                    </a>
                <?php endif; ?>
                <div class="slider-content">
                    <?php if ($attributes['sliderDisplayTitle']) : ?>
                        <a href="<?php echo $post->link ?>" target="_blank">
                            <h2><?php echo esc_html($post->title->rendered); ?></h2>
                        </a>
                    <?php endif; ?>
                    <div class="meta-data">
                        <?php if ($attributes['sliderDisplayDate']) : ?>
                            <div class="date">
                                <span class="dashicons dashicons-calendar"></span>
                                <p>
                                    <?php
                                    $post_date_obj = new DateTime($post->date);
                                    echo $formatted_date = $post_date_obj->format('F j, Y');
                                    ?>
                                </p>
                            </div>
                        <?php endif; ?>
                        <?php if ($attributes['sliderDisplayAuthor']) : ?>
                            <div class="author">
                                <span class="dashicons dashicons-admin-users"></span>
                                <p>
                                    <?php
                                    $author_response = wp_remote_get($slider_blog_url . '/wp-json/wp/v2/users/' . $post->author);
                                    if (is_wp_error($author_response)) {
                                        $author = "";
                                    } else {
                                        $author = json_decode(wp_remote_retrieve_body($author_response), true);
                                    }
                                    echo $author["name"];
                                    ?>
                                </p>
                            </div>
                        <?php endif; ?>
                        <?php if ($attributes['sliderDisplayCategories']) : ?>
                            <div class="categories">
                                <span class="dashicons dashicons-category"></span>
                                <?php
                                foreach ($post->categories as $index => $category_id) {
                                    $category_response = wp_remote_get($slider_blog_url . '/wp-json/wp/v2/categories/' . $category_id);
                                    if (!is_wp_error($category_response) && $category_response['response']['code'] === 200) {
                                        $category = json_decode(wp_remote_retrieve_body($category_response), true);
                                        echo '<p class="individual-categories">' . $category['name'];
                                        // Check if it's not the last category
                                        if ($index < count($post->categories) - 1) {
                                            echo ',';
                                        }
                                        echo '</p>';
                                    }
                                }
                                ?>

                            </div>
                        <?php endif; ?>
                    </div>
                    <?php if ($attributes['sliderDisplayExcerpt']) : ?>
                        <p><?php echo $post->excerpt->rendered ?></p>
                    <?php endif; ?>
                    <?php if ($attributes['sliderShowReadMoreButton']) : ?>
                        <a href="<?php echo $post->link ?>" target="_blank" class="readmore-btn">Read More</a>
                    <?php endif; ?>
                </div>
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
