import React from "react";

// components
import { ImageModal, ImagesList } from "../../components";

const PhotosCarousel = ({ type }) => {
	return (
		<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-2">
			{/* MODAL */}
			<ImageModal />

			{/* LIST OF IMAGES */}
			<ImagesList type={type} />
		</div>
	);
};

export default PhotosCarousel;
