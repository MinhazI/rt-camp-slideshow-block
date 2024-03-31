import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import "./editor.scss";
import "./includes/sliderBlock.js";
import { useEffect, useState } from "@wordpress/element";
import SliderBlock from "./includes/sliderBlock.js";

const Edit = ({ attributes, setAttributes }) => {
	const { url, displayTitle, displayImage, displayDate, displayAuthor } =
		attributes;
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch(`${url}/wp-json/wp/v2/posts`);
		if (!response.ok) {
			throw new Error("Failed to fetch posts");
		}
		const data = await response.json();
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, [url]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "boilerplate")} initialOpen={true}>
					<TextControl
						label="Blog link"
						value={url}
						onChange={(newUrl) => {
							setAttributes({ url: newUrl });
						}}
						help="Please enter the link you want us to extract the posts from. Keep this empty to use your websites."
					/>
					<ToggleControl
						label="Show title"
						help={displayTitle ? "Showing title" : "Not showing title"}
						checked={displayTitle}
						onChange={(userChoice) => {
							setAttributes({ displayTitle: userChoice });
						}}
					/>
					<ToggleControl
						label="Show featured image"
						help={
							displayImage
								? "Showing featured image"
								: "Not showing featured image"
						}
						checked={displayImage}
						onChange={(userChoice) => {
							setAttributes({ displayImage: userChoice });
						}}
					/>
					<ToggleControl
						label="Show date"
						help={displayDate ? "Showing date" : "Not showing date"}
						checked={displayDate}
						onChange={(userChoice) => {
							setAttributes({ displayDate: userChoice });
						}}
					/>
					<ToggleControl
						label="Show author"
						help={displayAuthor ? "Showing author" : "Not showing author"}
						checked={displayAuthor}
						onChange={(userChoice) => {
							setAttributes({ displayAuthor: userChoice });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<SliderBlock posts={posts} attributes={attributes} />
		</>
	);
};

export default Edit;
