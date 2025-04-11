import React from "react";
import { Link } from "react-router-dom";

const Button = ({ url, text, className, err }) => {
	const clsName = `my-8 px-4 text-sm md:my-10 md:text-base lg:text-lg xl:text-xl btn rounded-lg text-slate-100 hover:bg-transparent hover:border-2 ${className}`;

	if (err) {
		return (
			<Link
				to={url}
				className={`${clsName} btn-error hover:border-error hover:text-error`}
			>
				{text}
			</Link>
		);
	}

	return (
		<Link
			to={url}
			className={`${clsName} btn-primary hover:border-primary hover:text-primary`}
		>
			{text}
		</Link>
	);
};

export default Button;
