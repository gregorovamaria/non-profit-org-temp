import React from "react";
import ImageContainer from "../ImageContainer/ImageContainer";

const Avatar = ({ url, name, role, phone, elementId, altText }) => {
	const tel = phone ? "Tel." : null;

	return (
		<div className="grid h-48 max-w-80 md:w-auto md:grid-cols-2 md:gap-4 items-center md:justify-items-center border-solid border-primary border-2 rounded-md p-6 shadow-md hover:shadow-lg shrink">
			<ImageContainer
				elementId={elementId}
				altText={altText}
				className="size-1/4 md:size-2/3 grid content-center"
				url={url}
			/>
			<div className="pt-4 md:pt-0">
				<h6 className="font-bold text-primary">{name}</h6>
				<p className="text-xs pt-2">{role}</p>
				<p className="text-xs pt-2">
					<span>{tel}</span>
					{phone}
				</p>
			</div>
		</div>
	);
};

export default Avatar;
