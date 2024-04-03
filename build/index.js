/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/slider-block.js":
/*!************************************!*\
  !*** ./src/assets/slider-block.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);




const SliderBlock = ({
  posts,
  attributes,
  isLoading,
  setIsLoading
}) => {
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
    sliderShowReadMoreButton
  } = attributes;
  const [currentSlide, setCurrentSlide] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [featuredImageUrls, setFeaturedImageUrls] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [authorNames, setAuthorNames] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [categoryNames, setCategoryNames] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [blogUrl, setBlogUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(sliderBlogUrl);
  const nextSlide = () => {
    setCurrentSlide(prevSlide => prevSlide === posts.length - 1 ? 0 : prevSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(prevSlide => prevSlide === 0 ? posts.length - 1 : prevSlide - 1);
  };
  const autoSlide = () => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  };
  const setSlide = index => {
    setCurrentSlide(index);
  };
  const truncateExcerpt = excerpt => {
    const words = excerpt.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return excerpt;
  };
  const fetchFeaturedImage = async featured_media => {
    setIsLoading(true);
    try {
      const response = await fetch(`${blogUrl}/wp-json/wp/v2/media/${featured_media}`);
      if (!response.ok) {
        return "none";
      }
      const data = await response.json();
      return data && data.guid && data.guid.rendered ? data.guid.rendered : "none";
    } catch (error) {
      return "none";
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAuthorName = async authorId => {
    setIsLoading(true);
    try {
      const response = await fetch(`${blogUrl}/wp-json/wp/v2/users/${authorId}`);
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
  const fetchCategoryName = async categoryId => {
    setIsLoading(true);
    try {
      const response = await fetch(`${blogUrl}/wp-json/wp/v2/categories/${categoryId}`);
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsLoading(true);
    setBlogUrl(sliderBlogUrl.startsWith("https://") ? sliderBlogUrl : "https://" + sliderBlogUrl);
    setIsLoading(false);
  }, [sliderBlogUrl]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (sliderAutoSlide) {
      const clearInterval = autoSlide();
      return clearInterval;
    }
  }, [posts, sliderAutoSlide]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchImageUrls = async () => {
      if (posts && posts.length) {
        const urls = await Promise.all(posts.map(post => fetchFeaturedImage(post.featured_media)));
        setFeaturedImageUrls(urls);
      }
    };
    const fetchAuthors = async () => {
      if (posts && posts.length) {
        const authorPromises = posts.map(post => fetchAuthorName(post.author));
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)()
  }, isLoading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: 20,
      textAlign: "center"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Loading posts from the link. If the posts aren't showing, try adding the link again.")) : posts && posts.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "slideshow-container"
  }, posts.map((post, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: `slide ${index === currentSlide ? "active" : ""}`,
    style: {
      display: index === currentSlide ? "block" : "none",
      backgroundImage: sliderDisplayImage ? `url(${featuredImageUrls[index]})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative"
    }
  }, sliderDisplayImage && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: posts.link,
    target: "_blank",
    className: "featured-image"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: featuredImageUrls[index],
    alt: post.title.rendered,
    width: "100%"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "slider-content"
  }, sliderDisplayTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: posts.link,
    target: "_blank"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    dangerouslySetInnerHTML: {
      __html: post.title.rendered
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "meta-data"
  }, sliderDisplayDate && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "date"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-calendar"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }))), sliderDisplayAuthor && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "author"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-admin-users"
  }), authorNames[index] ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, authorNames[index]) : ""), sliderDisplayCategories && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "categories"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-category"
  }), post.categories.map((categoryId, catIndex) => {
    const categoryName = categoryNames[index] ? categoryNames[index][catIndex] : "";
    const isLastCategory = catIndex === post.categories.length - 1;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      key: catIndex,
      className: "individual-categories"
    }, categoryName, !isLastCategory && ",");
  }))), sliderDisplayExcerpt && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: truncateExcerpt(post.excerpt.rendered)
    }
  }), sliderShowReadMoreButton && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: post.link,
    className: "readmore-btn"
  }, "Read More")))), sliderDisplayArrows && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "prev",
    onClick: prevSlide
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-arrow-left-alt"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "next",
    onClick: nextSlide
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-arrow-right-alt"
  }))), sliderAutoSlide && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "navigation-container"
  }, posts.map((post, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    key: index,
    className: `navigation ${index === currentSlide ? "active" : ""}`,
    onClick: () => setSlide(index)
  })))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "No posts found. Please check the blog link."));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SliderBlock);

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_slider_block_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/slider-block.js */ "./src/assets/slider-block.js");







const Edit = ({
  attributes,
  setAttributes
}) => {
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
    sliderShowReadMoreButton
  } = attributes;
  const [posts, setPosts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)([]);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(true);
  const [url, setUrl] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(sliderBlogUrl);
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      let apiUrl = sliderBlogUrl.trim(); // Trim whitespace

      if (apiUrl != "") {
        const response = await fetch("/wp-json/rtcamp-slideshow/v1/fetch-posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sliderBlogUrl: apiUrl
          }) // Use the modified URL in the request body
        });
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    fetchPosts();
  }, [sliderBlogUrl]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Settings", "boilerplate"),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: "Blog link",
    value: url,
    onChange: newUrl => {
      setUrl(newUrl);
    },
    help: "Please enter the link you want us to extract the posts from. Keep this empty to use your current website link. Format [wptavern.com] or [rtcamp.com]"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "primary",
    onClick: () => setAttributes({
      sliderBlogUrl: url
    }),
    style: {
      marginBottom: 50
    },
    disabled: sliderBlogUrl == url
  }, "Save link"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: "Show post title",
    help: sliderDisplayTitle ? "Showing title" : "Not showing title",
    checked: sliderDisplayTitle,
    onChange: userChoice => {
      setAttributes({
        sliderDisplayTitle: userChoice
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: "Show excerpt",
    help: sliderDisplayExcerpt ? "Showing excerpt" : "Not showing excerpt",
    checked: sliderDisplayExcerpt,
    onChange: userChoice => {
      setAttributes({
        sliderDisplayExcerpt: userChoice
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: "Show featured image",
    help: sliderDisplayImage ? "Showing featured image" : "Not showing featured image",
    checked: sliderDisplayImage,
    onChange: userChoice => {
      setAttributes({
        sliderDisplayImage: userChoice
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: "Show date",
    help: sliderDisplayDate ? "Showing date" : "Not showing date",
    checked: sliderDisplayDate,
    onChange: userChoice => {
      setAttributes({
        sliderDisplayDate: userChoice
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: "Show author",
    help: sliderDisplayAuthor ? "Showing author" : "Not showing author",
    checked: sliderDisplayAuthor,
    onChange: userChoice => {
      setAttributes({
        sliderDisplayAuthor: userChoice
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: "Show read more button",
    help: sliderShowReadMoreButton ? "Showing read more button" : "Not showing read more button",
    checked: sliderShowReadMoreButton,
    onChange: userChoice => {
      setAttributes({
        sliderShowReadMoreButton: userChoice
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: "Show categories",
    help: sliderDisplayCategories ? "Showing categories" : "Not showing categories",
    checked: sliderDisplayCategories,
    onChange: userChoice => {
      setAttributes({
        sliderDisplayCategories: userChoice
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: "Auto slide",
    help: sliderAutoSlide ? "Slider will auto slide" : "Slider will not auto slide",
    checked: sliderAutoSlide,
    onChange: userChoice => {
      setAttributes({
        sliderAutoSlide: userChoice
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: "Slider arrows",
    help: sliderAutoSlide ? "Show slider arrows" : "Hide slider arrows",
    checked: sliderDisplayArrows,
    onChange: userChoice => {
      setAttributes({
        sliderDisplayArrows: userChoice
      });
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_assets_slider_block_js__WEBPACK_IMPORTED_MODULE_6__["default"], {
    posts: posts,
    attributes: attributes,
    isLoading: isLoading,
    setIsLoading: setIsLoading
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/block.json");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"minhaz/rt-camp-slideshow-block","version":"0.1.0","title":"rtCamp Slideshow Block","category":"rtcamp-assignment-category","icon":"slides","description":"Gutenberg Slideshow Block for WordPress Posts assignment from rtCamp.","example":{},"supports":{"html":false,"alignWide":true},"attributes":{"sliderBlogUrl":{"type":"string","default":"https://www.wptavern.com"},"sliderDisplayTitle":{"type":"boolean","default":true},"sliderDisplayExcerpt":{"type":"boolean","default":true},"sliderDisplayImage":{"type":"boolean","default":true},"sliderDisplayDate":{"type":"boolean","default":true},"sliderDisplayAuthor":{"type":"boolean","default":true},"sliderDisplayCategories":{"type":"boolean","default":true},"sliderAutoSlide":{"type":"boolean","default":true},"sliderDisplayArrows":{"type":"boolean","default":true},"sliderDisplayNavigation":{"type":"boolean","default":true},"sliderShowReadMoreButton":{"type":"boolean","default":true}},"textdomain":"rt-camp-slideshow-block","editorScript":"file:./index.js","editorStyle":["file:./index.css","dashicons"],"style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkrt_camp_slideshow_block"] = globalThis["webpackChunkrt_camp_slideshow_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map