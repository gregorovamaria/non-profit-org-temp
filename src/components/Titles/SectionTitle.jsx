import React from "react";

const SectionTitle = ({ text }) => {
	return (
		<div className="pb-8">
			<h2 className="pb-4">{text}</h2>
			<div className="border-b border-base-300 max-w-screen-sm"></div>
		</div>
	);
};

export default SectionTitle;
