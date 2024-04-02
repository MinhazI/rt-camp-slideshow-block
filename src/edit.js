import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import {
	Disabled,
	PanelBody,
	TextControl,
	ToggleControl,
} from "@wordpress/components";
import "./editor.scss";

import { useEffect, useState } from "@wordpress/element";
import SliderBlock from "./assets/slider-block.js";

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
	const [isLoading, setIsLoading] = useState(false);

	const fetchPosts = async () => {
		setIsLoading(true);
		try {
			let apiUrl = sliderBlogUrl.trim(); // Trim whitespace

			if (apiUrl != "") {
				const response = await fetch(
					"/wp-json/rtcamp-slideshow/v1/fetch-posts",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ sliderBlogUrl: apiUrl }), // Use the modified URL in the request body
					},
				);

				if (!response.ok) {
					throw new Error("Failed to fetch posts");
				}

				const data = await response.json();
				setPosts(data.posts); // Assuming 'posts' is the key for posts data in the response
			} else {
				const response = await fetch("/wp-json/wp/v2/posts");
				if (!response.ok) {
					throw new Error("Failed to fetch posts");
				}
				const data = await response.json();
				setPosts(data);
			}
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
		setIsLoading(false);
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
						help="Please enter the link you want us to extract the posts from. Keep this empty to use your current website link. Format [wptravern.com] or [rtcamp.com]"
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
			<SliderBlock posts={posts} attributes={attributes} loading={isLoading} />
		</>
	);
};

export default Edit;
