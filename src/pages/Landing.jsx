import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";

// Components
import {
	Hero,
	TwoPartsDesign,
	AboutInfo,
	BlogInfo,
	SupportInfo,
	ImageContainer,
	Carousel,
	Loading,
} from "../components";

// Data
import { themes, numOfSlides } from "../utils/data";
import { getBlogsLocal } from "../utils/index_local";

// Images
import hero from "../../pictures/landingPage/hero.jpg";
import showing_support from "../../pictures/landingPage/undraw_showing_support.svg";
import showing_support_dark from "../../pictures/landingPage/undraw_showing_support-dark.svg";

// Loader
export const loader = async () => {
	let blogsDetails = null;

	if (import.meta.env.VITE_SOURCE != "local") {
		const blogsDetailsFirebase = await (
			await import("../utils")
		).getFilteredData({
			limitNumber: numOfSlides,
		});
		blogsDetails = blogsDetailsFirebase;
	} else {
		let blogs = await getBlogsLocal({
			params: { search: null, dateFrom: null, dateTo: null, order: null },
			lastVisible: null,
			page: null,
			direction: null,
		});

		localStorage.setItem("blogsData", JSON.stringify(blogs));
		blogsDetails = blogs;
	}
	return blogsDetails;
};

const Landing = () => {
	const navigation = useNavigation();
	const isPageLoading = navigation.state === "loading";
	const theme = useSelector((state) => state.userState.theme);
	const selectedTheme = Object.entries(themes).filter(
		(item) => item[1] === theme
	)[0][0];

	if (isPageLoading) {
		return <Loading />;
	}

	// DOWNLOAD IMAGES
	let heroImg = "";
	import.meta.env.VITE_SOURCE === "local"
		? (heroImg = hero)
		: import("../utils").downloadImage("landing/hero.jpg", "hero");

	let supportImg = "";

	if (import.meta.env.VITE_SOURCE != "local" && selectedTheme === "dark") {
		import("../utils").downloadImage(
			"landing/undraw_showing_support-dark.svg",
			"supportImg"
		);
	} else if (
		import.meta.env.VITE_SOURCE != "local" &&
		selectedTheme != "dark"
	) {
		import("../utils").downloadImage(
			"landing/undraw_showing_support.svg",
			"supportImg"
		);
	} else if (
		import.meta.env.VITE_SOURCE === "local" &&
		selectedTheme === "dark"
	) {
		supportImg = showing_support_dark;
	} else {
		supportImg = showing_support;
	}

	return (
		<main>
			{/* HERO */}
			<Hero />

			{/* ABOUT */}
			<section id="about" className="section">
				<div className="align-element">
					<TwoPartsDesign
						first={
							<ImageContainer
								elementId="hero"
								altText="cool forest picture"
								className={
									selectedTheme === "dark" ? "about-img dark" : "about-img"
								}
								url={heroImg}
							/>
						}
						second={<AboutInfo />}
						firstClassName="first-section"
					/>
				</div>
			</section>

			{/* BLOGS */}
			<section id="blog" className="section">
				<div className="align-element">
					<TwoPartsDesign
						first={<BlogInfo />}
						second={<Carousel />}
						firstClassName="first-section"
						secondClassName="relative"
					/>
				</div>
			</section>

			{/* 2% TAX / SUPPORT */}
			<section id="support" className="section">
				<div className="align-element">
					<TwoPartsDesign
						first={
							<ImageContainer
								elementId="supportImg"
								className="grid justify-center"
								imgClassName="h-32 sm:h-60"
								url={supportImg}
							/>
						}
						second={<SupportInfo />}
						firstClassName="grid content-center first-section"
					/>
				</div>
			</section>
		</main>
	);
};

export default Landing;
