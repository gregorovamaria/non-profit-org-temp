import React from "react";
import { useSelector } from "react-redux";
import { SectionTitle } from "../components";

// utils & data
import { contactInfo, themes } from "../utils/data";
import envelope from "../../pictures/contactPage/undraw_envelope-light.svg";
import envelopeDark from "../../pictures/contactPage/undraw_envelope-dark.svg";
import stickyNote from "../../pictures/contactPage/undraw_sticky-note-light.svg";
import stickyNoteDark from "../../pictures/contactPage/undraw_sticky-note-dark.svg";

const Contact = () => {
	const { name, orgType, address, ico, email } = contactInfo[0];
	const theme = useSelector((state) => state.userState.theme);
	const selectedTheme = Object.entries(themes).filter(
		(item) => item[1] === theme
	)[0][0];

	// DOWNLOAD IMAGES
	let homeImg;
	let envelopeImg;

	if (selectedTheme === "dark" && import.meta.env.VITE_SOURCE != "local") {
		import("../utils").downloadImage(
			"contact/undraw_sticky-note-dark.svg",
			"home"
		);
		import("../utils").downloadImage(
			"contact/undraw_envelope-dark.svg",
			"envelope"
		);
	} else if (
		selectedTheme != "dark" &&
		import.meta.env.VITE_SOURCE != "local"
	) {
		import("../utils").downloadImage(
			"contact/undraw_sticky-note-light.svg",
			"home"
		);
		import("../utils").downloadImage(
			"contact/undraw_envelope-light.svg",
			"envelope"
		);
	} else if (
		selectedTheme === "dark" &&
		import.meta.env.VITE_SOURCE === "local"
	) {
		homeImg = stickyNoteDark;
		envelopeImg = envelopeDark;
	} else {
		homeImg = stickyNote;
		envelopeImg = envelope;
	}

	return (
		<main>
			<section className="section">
				<div className="align-element">
					<SectionTitle text="Contact Info" />
					<article className="pt-4 sm:pt-8 grid sm:grid-cols-[85px_minmax(0,_1fr)] sm:gap-8">
						<img
							id="home"
							alt="homeIcon"
							className="h-10 sm:h-auto"
							src={homeImg}
						/>
						<div>
							<p className="flex flex-wrap gap-x-1 pt-2">
								<span className="font-bold text-primary">Name: </span>
								{name}
							</p>
							<p className="flex flex-wrap gap-x-1 pt-2">
								<span className="font-bold text-primary">Org. form: </span>
								{orgType}
							</p>
							<p className="flex flex-wrap gap-x-1 pt-2">
								<span className="font-bold text-primary">Address: </span>
								{address}
							</p>
							<p className="flex flex-wrap gap-x-1 pt-2">
								<span className="font-bold text-primary">ID#: </span>
								{ico}
							</p>
						</div>
					</article>
					<article className="pt-8 grid gap-4 sm:grid-cols-[85px_minmax(0,_1fr)] sm:gap-8">
						<img
							id="envelope"
							alt="emailIcon"
							className="h-10 sm:h-auto"
							src={envelopeImg}
						/>
						<div>
							<p className="flex flex-wrap gap-x-1 pt-2">
								<span className="font-bold text-primary">Email: </span>
								{email}
							</p>
						</div>
					</article>
				</div>
			</section>
		</main>
	);
};

export default Contact;
