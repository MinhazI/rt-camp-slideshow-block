import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import {
	Button,
	PanelBody,
	TextControl,
	ToggleControl,
	DropdownControl,
} from "@wordpress/components";
import "./editor.scss";

import { useEffect, useState } from "@wordpress/element";
import SliderBlock from "./assets/slider-block.js";

const Edit = ({ attributes, setAttributes }) => {
	const {
		sliderBlogUrl,
		sliderShowExcerpt,
		sliderShowImage,
		sliderShowDate,
		sliderShowAuthor,
		sliderShowCategories,
		sliderAutoSlide,
		sliderShowArrows,
		sliderNumberOfSlides,
		sliderShowReadMoreButton,
	} = attributes;

	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [url, setUrl] = useState(sliderBlogUrl);

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
	};

	useEffect(() => {
		fetchPosts();
	}, [sliderBlogUrl]);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("General settings", "rt-camp-slidershow-block")}
					initialOpen={true}
				>
					<TextControl
						label="Blog link"
						value={url}
						onChange={(newUrl) => {
							setUrl(newUrl);
						}}
						help="Please enter the link you want us to extract the posts from. Keep this empty to use your current website link. Format [wptavern.com] or [rtcamp.com]"
					/>
					<Button
						variant="primary"
						onClick={() => setAttributes({ sliderBlogUrl: url })}
						disabled={sliderBlogUrl == url}
						help="Click to save the entered blog link"
					>
						Save link
					</Button>
				</PanelBody>
				<PanelBody
					title={__("Slider settings", "rt-camp-slidershow-block")}
					initialOpen={true}
				>
					<ToggleControl
						label="Show excerpt"
						help={
							sliderShowExcerpt
								? "Showing excerpt/description"
								: "Not showing excerpt/description"
						}
						checked={sliderShowExcerpt}
						onChange={(userChoice) => {
							setAttributes({ sliderShowExcerpt: userChoice });
						}}
					/>
					<ToggleControl
						label="Show featured image"
						help={
							sliderShowImage
								? "Showing featured image"
								: "Not showing featured image"
						}
						checked={sliderShowImage}
						onChange={(userChoice) => {
							setAttributes({ sliderShowImage: userChoice });
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
						label="Autoplay"
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
						label="Show left/right arrows"
						help={
							sliderShowArrows
								? "Show slider left and right arrows"
								: "Hide slider arrows"
						}
						checked={sliderShowArrows}
						onChange={(userChoice) => {
							setAttributes({ sliderShowArrows: userChoice });
						}}
					/>
				</PanelBody>
				<PanelBody
					title={__("Meta data settings", "rt-camp-slidershow-block")}
					initialOpen={true}
				>
					<ToggleControl
						label="Show categories"
						help={
							sliderShowCategories
								? "Showing categories"
								: "Not showing categories"
						}
						checked={sliderShowCategories}
						onChange={(userChoice) => {
							setAttributes({ sliderShowCategories: userChoice });
						}}
					/>

					<ToggleControl
						label="Show date"
						help={sliderShowDate ? "Showing date" : "Not showing date"}
						checked={sliderShowDate}
						onChange={(userChoice) => {
							setAttributes({ sliderShowDate: userChoice });
						}}
					/>
					<ToggleControl
						label="Show author"
						help={sliderShowAuthor ? "Showing author" : "Not showing author"}
						checked={sliderShowAuthor}
						onChange={(userChoice) => {
							setAttributes({ sliderShowAuthor: userChoice });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<SliderBlock
				posts={posts}
				attributes={attributes}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
		</>
	);
};

export default Edit;
