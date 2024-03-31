import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import "./editor.scss";
import "./includes/sliderBlock.js";
import { useEffect, useState } from "@wordpress/element";
import SliderBlock from "./includes/sliderBlock.js";

const Edit = ({ attributes, setAttributes }) => {
	const {
		sliderBlogUrl,
		sliderDisplayTitle,
		sliderDisplayExcerpt,
		sliderDisplayImage,
		sliderDisplayDate,
		sliderDisplayAuthor,
		sliderDisplayCategories,
		sliderAutoSlide,
		sliderDisplayArrows,
		sliderDisplayNavigation,
		sliderShowReadMoreButton,
	} = attributes;
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch(`${sliderBlogUrl}/wp-json/wp/v2/posts`);
		if (!response.ok) {
			throw new Error("Failed to fetch posts");
		}
		const data = await response.json();
		// const postsWithFeaturedImages = await Promise.all(
		// 	data.map(async (post) => {
		// 		const authorResponse = await fetch(
		// 			`${url}/wp-json/wp/v2/users/${post.author}`,
		// 		);
		// 		const authorData = await authorResponse.json();
		// 		const categoriesResponse = await fetch(
		// 			`${url}/wp-json/wp/v2/posts/${post.id}/categories/${post}`,
		// 		);
		// 		const categoriesData = await categoriesResponse.json();
		// 		const featuredMediaResponse = await fetch(
		// 			`${url}/wp-json/wp/v2/media/${post.featured_media}`,
		// 		);
		// 		const featuredMediaData = await featuredMediaResponse.json();
		// 		return {
		// 			...post,
		// 			author: authorData.name,
		// 			categories: categoriesData,
		// 			featuredImage: featuredMediaData.source_url,
		// 		};
		// 	}),
		// );
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, [sliderBlogUrl]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "boilerplate")} initialOpen={true}>
					<TextControl
						label="Blog link"
						value={sliderBlogUrl}
						onChange={(newUrl) => {
							setAttributes({ sliderBlogUrl: newUrl });
						}}
						help="Please enter the link you want us to extract the posts from. Keep this empty to use your websites."
					/>
					<ToggleControl
						label="Show post title"
						help={sliderDisplayTitle ? "Showing title" : "Not showing title"}
						checked={sliderDisplayTitle}
						onChange={(userChoice) => {
							setAttributes({ sliderDisplayTitle: userChoice });
						}}
					/>
					<ToggleControl
						label="Show excerpt"
						help={
							sliderDisplayExcerpt ? "Showing excerpt" : "Not showing excerpt"
						}
						checked={sliderDisplayExcerpt}
						onChange={(userChoice) => {
							setAttributes({ sliderDisplayExcerpt: userChoice });
						}}
					/>
					<ToggleControl
						label="Show featured image"
						help={
							sliderDisplayImage
								? "Showing featured image"
								: "Not showing featured image"
						}
						checked={sliderDisplayImage}
						onChange={(userChoice) => {
							setAttributes({ sliderDisplayImage: userChoice });
						}}
					/>
					<ToggleControl
						label="Show date"
						help={sliderDisplayDate ? "Showing date" : "Not showing date"}
						checked={sliderDisplayDate}
						onChange={(userChoice) => {
							setAttributes({ sliderDisplayDate: userChoice });
						}}
					/>
					<ToggleControl
						label="Show author"
						help={sliderDisplayAuthor ? "Showing author" : "Not showing author"}
						checked={sliderDisplayAuthor}
						onChange={(userChoice) => {
							setAttributes({ sliderDisplayAuthor: userChoice });
						}}
					/>
					<ToggleControl
						label="Show read more button"
						help={
							sliderShowReadMoreButton
								? "Showing read more button"
								: "Not showing read more button"
						}
						checked={sliderShowReadMoreButton}
						onChange={(userChoice) => {
							setAttributes({ sliderShowReadMoreButton: userChoice });
						}}
					/>
					<ToggleControl
						label="Show categories"
						help={
							sliderDisplayCategories
								? "Showing categories"
								: "Not showing categories"
						}
						checked={sliderDisplayCategories}
						onChange={(userChoice) => {
							setAttributes({ sliderDisplayCategories: userChoice });
						}}
					/>
					<ToggleControl
						label="Show navigation"
						help={
							sliderDisplayNavigation
								? "Show slider navigation"
								: "Hide slider navigation"
						}
						checked={sliderDisplayNavigation}
						onChange={(userChoice) => {
							setAttributes({ sliderDisplayNavigation: userChoice });
						}}
					/>
					<ToggleControl
						label="Auto slide"
						help={
							sliderAutoSlide
								? "Slider will auto slide"
								: "Slider will not auto slide"
						}
						checked={sliderAutoSlide}
						onChange={(userChoice) => {
							setAttributes({ sliderAutoSlide: userChoice });
						}}
					/>
					<ToggleControl
						label="Slider arrows"
						help={sliderAutoSlide ? "Show slider arrows" : "Hide slider arrows"}
						checked={sliderDisplayArrows}
						onChange={(userChoice) => {
							setAttributes({ sliderDisplayArrows: userChoice });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<SliderBlock posts={posts} attributes={attributes} />
		</>
	);
};

export default Edit;
