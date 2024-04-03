import React, { useState, useEffect } from "react";
import { useBlockProps } from "@wordpress/block-editor";
import { Icon, Spinner } from "@wordpress/components";
import { arrowLeft, arrowRight } from "@wordpress/icons";

const SliderBlock = ({ posts, attributes, loading }) => {
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
		sliderShowReadMoreButton,
	} = attributes;
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

	const autoSlide = () => {
		const interval = setInterval(() => {
			nextSlide();
		}, 7000);
		return () => clearInterval(interval);
	};

	useEffect(() => {
		sliderAutoSlide && autoSlide;
	}, [posts]);

	const setSlide = (index) => {
		setCurrentSlide(index);
	};

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const truncateExcerpt = (excerpt) => {
		const words = excerpt.split(" ");
		if (words.length > 20) {
			return words.slice(0, 20).join(" ") + "...";
		}
		return excerpt;
	};

	return (
		<div {...useBlockProps()}>
			{loading ? (
				<div
					style={{
						padding: 20,
						textAlign: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<Spinner />
					</div>
					<p>
						Loading posts from the link. If the posts aren't showing, try adding
						the link again.
					</p>
				</div>
			) : posts && posts.length ? (
				<div className="slideshow-container">
					{posts.map((post, index) => (
						<div
							key={index}
							className={`slide ${index === currentSlide ? "active" : ""}`}
							style={{
								display: index === currentSlide ? "block" : "none",
								backgroundSize: "cover",
								backgroundPosition: "center",
								position: "relative",
							}}
						>
							<div className="overlay">
								{sliderDisplayTitle && (
									<h3
										dangerouslySetInnerHTML={{ __html: post.title.rendered }}
									/>
								)}
								{sliderDisplayDate && <p>{formatDate(post.date)}</p>}
								{sliderDisplayAuthor && <p>{post.author}</p>}
								{sliderDisplayCategories && post.categories && (
									<div>
										Categories:{" "}
										{post.categories
											.map((category) => category.name)
											.join(", ")}
									</div>
								)}
								{sliderDisplayExcerpt && (
									<p
										dangerouslySetInnerHTML={{
											__html: truncateExcerpt(post.excerpt.rendered),
										}}
									/>
								)}
								{sliderShowReadMoreButton && (
									<a href={post.link} className="readmore-btn">
										Read More
									</a>
								)}
							</div>
						</div>
					))}
					{sliderDisplayArrows && (
						<>
							<a className="prev" onClick={prevSlide}>
								<Icon icon={arrowLeft} />
							</a>
							<a className="next" onClick={nextSlide}>
								<Icon icon={arrowRight} />
							</a>
						</>
					)}

					{sliderAutoSlide && (
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
					)}
				</div>
			) : (
				<p>No posts found. Please check the blog link.</p>
			)}
		</div>
	);
};

export default SliderBlock;
