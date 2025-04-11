import React from "react";
import Button from "./Button/Button";
import logo from "../../pictures/landingPage/logo.svg";

const Hero = () => {
	let logoImg = "";

	if (import.meta.env.VITE_SOURCE === "local") {
		logoImg = logo;
	} else {
		import("../utils").downloadImage("landing/logo.svg", "logo");
	}

	return (
		<section className="hero-img grid relative content-center">
			<div className="align-element grid justify-items-center py-24 text-center">
				<img
					id="logo"
					alt="Non-Profit-Org"
					className="absolute top-10 left-10 h-20 sm:h-24"
					src={logoImg}
				/>
				<h1 className="text-slate-100">Non-Profit-Org</h1>
				<Button
					url="#about"
					text="More..."
					className="hover:border-white hover:text-slate-100"
				/>
			</div>
		</section>
	);
};

export default Hero;
