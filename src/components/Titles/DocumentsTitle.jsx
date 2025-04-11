import React from "react";

const DocumentsTitle = ({ number, text }) => {
	return (
		<div className="pt-12 pb-6">
			<h4 className="font-bold text-center">ARTICLE {number}</h4>
			<div className="font-bold text-center text-lg md:text-xl lg:text-2xl m-0 font-headingFont leading-none">
				{text}
			</div>
		</div>
	);
};

export default DocumentsTitle;
