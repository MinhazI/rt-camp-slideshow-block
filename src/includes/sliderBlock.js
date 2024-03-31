import React, { useState, useEffect } from "react";
import { useBlockProps } from "@wordpress/block-editor";

const SliderBlock = ({ posts, attributes }) => {
	const { displayTitle, displayImage, displayDate, displayAuthor } = attributes;
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === posts.length - 1 ? 0 : prevSlide + 1,
		);
	};

	const prevSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? posts.length - 1 : prevSlide - 1,
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const setSlide = (index) => {
		setCurrentSlide(index);
	};

	return (
		<div {...useBlockProps()}>
			{posts && posts.length ? (
				<div className="slideshow-container">
					{posts.map((post, index) => (
						<div
							key={index}
							className={`slide ${index === currentSlide ? "active" : ""}`}
							style={{ display: index === currentSlide ? "block" : "none" }}
						>
							<q>{post.title.rendered}</q>
						</div>
					))}
					<a className="prev" onClick={prevSlide}>
						❮
					</a>
					<a className="next" onClick={nextSlide}>
						❯
					</a>

					<div className="navigation-container">
						{posts.map((post, index) => (
							<span
								key={index}
								className={`navigation ${
									index === currentSlide ? "active" : ""
								}`}
								onClick={() => setSlide(index)}
							></span>
						))}
					</div>
				</div>
			) : (
				<p>No posts found. Please check the blog link.</p>
			)}
		</div>
	);
};

export default SliderBlock;
