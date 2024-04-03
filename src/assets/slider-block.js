import React, { useState, useEffect, useMemo } from "react";
import { useBlockProps } from "@wordpress/block-editor";
import { Spinner } from "@wordpress/components";

const SliderBlock = ({ posts, attributes, isLoading, setIsLoading }) => {
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
	const [featuredImageUrls, setFeaturedImageUrls] = useState([]);
	const [authorNames, setAuthorNames] = useState([]);
	const [categoryNames, setCategoryNames] = useState([]);
	const [blogUrl, setBlogUrl] = useState(sliderBlogUrl);

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
		}, 5000);
		return () => clearInterval(interval);
	};

	const setSlide = (index) => {
		setCurrentSlide(index);
	};

	const truncateExcerpt = (excerpt) => {
		const words = excerpt.split(" ");
		if (words.length > 20) {
			return words.slice(0, 20).join(" ") + "...";
		}
		return excerpt;
	};

	const fetchFeaturedImage = async (featured_media) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${blogUrl}/wp-json/wp/v2/media/${featured_media}`,
			);
			if (!response.ok) {
				return "none";
			}
			const data = await response.json();

			return data && data.guid && data.guid.rendered
				? data.guid.rendered
				: "none";
		} catch (error) {
			return "none";
		} finally {
			setIsLoading(false);
		}
	};

	const fetchAuthorName = async (authorId) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${blogUrl}/wp-json/wp/v2/users/${authorId}`,
			);
			if (!response.ok) {
				return "";
			}
			const authorData = await response.json();
			return authorData.name || "";
		} catch (error) {
			console.error("Error fetching author:", error);
			return "";
		} finally {
			setIsLoading(false);
		}
	};

	const fetchCategoryName = async (categoryId) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${blogUrl}/wp-json/wp/v2/categories/${categoryId}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch category");
			}
			const categoryData = await response.json();
			return categoryData.name;
		} catch (error) {
			console.error("Error fetching category:", error);
			return "";
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		setBlogUrl(
			sliderBlogUrl.startsWith("https://")
				? sliderBlogUrl
				: "https://" + sliderBlogUrl,
		);
		setIsLoading(false);
	}, [sliderBlogUrl]);

	useEffect(() => {
		if (sliderAutoSlide) {
			const clearInterval = autoSlide();
			return clearInterval;
		}
	}, [posts, sliderAutoSlide]);

	useEffect(() => {
		const fetchImageUrls = async () => {
			if (posts && posts.length) {
				const urls = await Promise.all(
					posts.map((post) => fetchFeaturedImage(post.featured_media)),
				);
				setFeaturedImageUrls(urls);
			}
		};

		const fetchAuthors = async () => {
			if (posts && posts.length) {
				const authorPromises = posts.map((post) =>
					fetchAuthorName(post.author),
				);
				const authorNames = await Promise.all(authorPromises);
				setAuthorNames(authorNames);
			}
		};

		const fetchCategoryNames = async () => {
			if (posts && posts.length) {
				const categoryNames = [];
				for (const post of posts) {
					const postCategoryNames = [];
					for (const categoryId of post.categories) {
						const categoryName = await fetchCategoryName(categoryId);
						postCategoryNames.push(categoryName);
					}
					categoryNames.push(postCategoryNames);
				}
				setCategoryNames(categoryNames);
			}
		};

		fetchCategoryNames();
		fetchAuthors();
		fetchImageUrls();
	}, [posts]);

	return (
		<div {...useBlockProps()}>
			{isLoading ? (
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
								backgroundImage: sliderDisplayImage
									? `url(${featuredImageUrls[index]})`
									: "none",
								backgroundSize: "cover",
								backgroundPosition: "center",
								position: "relative",
							}}
						>
							{sliderDisplayImage && (
								<a href={posts.link} target="_blank" className="featured-image">
									<img
										src={featuredImageUrls[index]}
										alt={post.title.rendered}
										width="100%"
									/>
								</a>
							)}
							<div className="slider-content">
								{sliderDisplayTitle && (
									<a href={posts.link} target="_blank">
										<h2
											dangerouslySetInnerHTML={{ __html: post.title.rendered }}
										/>
									</a>
								)}
								<div className="meta-data">
									{sliderDisplayDate && (
										<div className="date">
											<span className="dashicons dashicons-calendar"></span>
											<p>
												{new Date(post.date).toLocaleDateString("en-US", {
													month: "long",
													day: "numeric",
													year: "numeric",
												})}
											</p>
										</div>
									)}
									{sliderDisplayAuthor && (
										<div className="author">
											<span className="dashicons dashicons-admin-users"></span>
											{authorNames[index] ? <p>{authorNames[index]}</p> : ""}
										</div>
									)}
									{sliderDisplayCategories && (
										<div className="categories">
											<span className="dashicons dashicons-category"></span>
											{post.categories.map((categoryId, catIndex) => {
												const categoryName = categoryNames[index]
													? categoryNames[index][catIndex]
													: "";
												const isLastCategory =
													catIndex === post.categories.length - 1;
												return (
													<p key={catIndex} className="individual-categories">
														{categoryName}
														{!isLastCategory && ","}
													</p>
												);
											})}
										</div>
									)}
								</div>

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
								<span className="dashicons dashicons-arrow-left-alt"></span>
							</a>
							<a className="next" onClick={nextSlide}>
								<span className="dashicons dashicons-arrow-right-alt"></span>
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
