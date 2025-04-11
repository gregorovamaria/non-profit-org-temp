import React from "react";
import { useRouteError } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import { Button } from "../components";

// utils & data
import { themes } from "../utils/data";

const Error = () => {
	const error = useRouteError();
	const theme = useSelector((store) => store.userState.theme);
	const selectedTheme = Object.entries(themes).filter(
		(item) => item[1] === theme
	)[0][0];

	console.log(error);

	selectedTheme === "dark"
		? import("../utils").downloadImage(
				"undraw_page_not_found-dark.svg",
				"error"
		  )
		: import("../utils").downloadImage("undraw_page_not_found.svg", "error");

	if (error.status === 404) {
		return (
			<main className="grid min-h-[100vh] place-items-center px-8 align-element">
				<div className="text-center">
					<img
						id="error"
						alt="404 page not found"
						className="w-40 h-40 mx-auto sm:w-80 sm:h-80 md:w-96 md:h-96"
					/>
					<p className="mt-6 text-lg leading-7">Page was not found</p>
					<Button to="/" text="Back Home" err={true} />
				</div>
			</main>
		);
	}

	return (
		<main className="grid section place-items-center px-8 align-element">
			<div className="text-center">
				<h2 className="font-bold">There was an error...</h2>
			</div>
		</main>
	);
};

export default Error;
