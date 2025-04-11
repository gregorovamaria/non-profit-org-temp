import React from "react";

const SubSectionTitle = ({ text, className }) => {
	return (
		<div className={`pb-8 pt-12 ${className}`}>
			<h3 className="font-bold">{text}</h3>
		</div>
	);
};

export default SubSectionTitle;
