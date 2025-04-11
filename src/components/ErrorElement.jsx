import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
	const error = useRouteError();
	console.log(error);

	return (
		<div className="section grid justify-items-center items-center">
			<h2 className="align-element font-bold">There was an error...</h2>
		</div>
	);
};

export default ErrorElement;
