import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import {
	Disabled,
	PanelBody,
	TextControl,
	ToggleControl,
} from "@wordpress/components";
import "./editor.scss";
import { useBlockProps } from "@wordpress/block-editor";

import metadata from "./block.json";
import ServerSideRender from "@wordpress/server-side-render";

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
			<div {...useBlockProps()}>
				<ServerSideRender block={metadata.name} attributes={attributes} />
			</div>
		</>
	);
};

export default Edit;
