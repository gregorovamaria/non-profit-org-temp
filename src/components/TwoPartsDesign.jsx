import React from "react";

const TwoPartsDesign = ({ first, second, firstClassName, secondClassName }) => {
	return (
		<div className="align-middle items-center md:grid md:grid-cols-2 md:gap-20">
			<article className={`sub-section ${firstClassName}`}>{first}</article>
			<article className={`${secondClassName}`}>{second}</article>
		</div>
	);
};

export default TwoPartsDesign;
