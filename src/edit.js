import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { title } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "boilerplate")} initialOpen={true}>
					<ToggleControl
						label="Title"
						help={title ? "Has fixed background." : "No fixed background."}
						checked={title}
						onChange={(newTitle) => {
							setAttributes({ title: newTitle });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<p
				{...useBlockProps()}
				style={{ display: title == true ? "block" : "none" }}
			>
				rtCamp Slideshow
			</p>
			;
		</>
	);
}
