import React from "react";

const ImageContainer = ({
	elementId,
	url,
	altText,
	className,
	imgClassName,
}) => {
	return (
		<article className={`${className}`}>
			<img
				id={elementId}
				src={url}
				alt={altText}
				className={`about-photo ${imgClassName}`}
			/>
		</article>
	);
};

export default ImageContainer;
