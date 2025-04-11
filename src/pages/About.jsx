import React from "react";
import { useSelector } from "react-redux";
import {
	SectionTitle,
	TwoPartsDesign,
	Avatar,
	ImageContainer,
	Documents,
	AboutUs,
	AboutDetails,
} from "../components";

// utils && images
import { teamMembers, themes } from "../utils/data";
import ourResults from "../../pictures/aboutUs/our_results.svg";
import ourResultsDark from "../../pictures/aboutUs/our_results-dark.svg";
import teamCollaboration from "../../pictures/aboutUs/undraw_team_collaboration.svg";
import teamCollaborationDark from "../../pictures/aboutUs/undraw_team_collaboration-dark.svg";
import avatarFemale from "../../pictures/avatar/undraw_female_avatar.svg";
import avatarFemaleDark from "../../pictures/avatar/undraw_female_avatar-dark.svg";
import avatarMale from "../../pictures/avatar/undraw_pic_profile.svg";
import avatarMaleDark from "../../pictures/avatar/undraw_pic_profile-dark.svg";

const About = () => {
	const theme = useSelector((state) => state.userState.theme);
	const selectedTheme = Object.entries(themes).filter(
		(item) => item[1] === theme
	)[0][0];

	// DOWNLOAD	IMAGES FROM STORAGE
	// team-work && our results
	let teamWorkImg;
	let ourResultsImg;

	if (import.meta.env.VITE_SOURCE != "local") {
		if (selectedTheme === "dark") {
			import("../utils").downloadImage(
				"aboutUs/undraw_team_collaboration-dark.svg",
				"teamWork"
			);
			import("../utils").downloadImage(
				"aboutUs/our_results-dark.svg",
				"our-results"
			);
		} else {
			import("../utils").downloadImage(
				"aboutUs/undraw_team_collaboration.svg",
				"teamWork"
			);
			import("../utils").downloadImage(
				"aboutUs/our_results.svg",
				"our-results"
			);
		}
	} else if (import.meta.env.VITE_SOURCE === "local") {
		if (selectedTheme === "dark") {
			teamWorkImg = teamCollaborationDark;
			ourResultsImg = ourResultsDark;
		} else {
			teamWorkImg = teamCollaboration;
			ourResultsImg = ourResults;
		}
	}

	let avatarTheme;

	return (
		<main>
			<section id="info" className="section">
				<div className="align-element">
					<SectionTitle text="About Us" />

					{/* BASIC INFO */}
					<TwoPartsDesign
						id="team-work"
						className="pb-0 sm:pb-0 md:pb-0 lg:pb-0"
						first={<AboutUs />}
						second={
							<ImageContainer
								elementId="teamWork"
								altText="team work"
								url={teamWorkImg}
							/>
						}
					/>
					<AboutDetails />
				</div>
			</section>

			{/* OUR RESULTS */}
			<section id="results" className="section">
				<div className="align-element">
					<SectionTitle text="Our Results" />
					<img
						id="our-results"
						alt="our results"
						className="w-full h-96"
						src={ourResultsImg}
					/>
				</div>
			</section>

			{/* AVATARS */}
			<section id="team" className="section">
				<div className="align-element">
					<SectionTitle text="Our Team" />
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center">
						{teamMembers.map((teamMember) => {
							const { id, name, avatar, role, phone } = teamMember;

							if (import.meta.env.VITE_SOURCE != "local") {
								if (selectedTheme === "dark" && avatar === "female") {
									downloadImage(
										"avatars/undraw_female_avatar-dark.svg",
										`avatar${id}`
									);
								} else if (selectedTheme === "light" && avatar === "female") {
									downloadImage(
										"avatars/undraw_female_avatar.svg",
										`avatar${id}`
									);
								} else if (selectedTheme === "dark" && avatar === "male") {
									downloadImage(
										"avatars/undraw_pic_profile-dark.svg",
										`avatar${id}`
									);
								} else if (selectedTheme === "light" && avatar === "male") {
									downloadImage(
										"avatars/undraw_pic_profile.svg",
										`avatar${id}`
									);
								} else {
									downloadImage(
										"avatars/undraw_female_avatar-dark.svg",
										`avatar${id}`
									);
								}
							} else {
								if (selectedTheme === "dark" && avatar === "female") {
									avatarTheme = avatarFemaleDark;
								} else if (selectedTheme === "light" && avatar === "female") {
									avatarTheme = avatarFemale;
								} else if (selectedTheme === "dark" && avatar === "male") {
									avatarTheme = avatarMaleDark;
								} else {
									avatarTheme = avatarMale;
								}
							}
							return (
								<Avatar
									key={id}
									url={avatarTheme}
									name={name}
									role={role}
									phone={phone}
									elementId={`avatar${id}`}
									altText="avatar"
								/>
							);
						})}
					</div>
				</div>
			</section>

			{/* DOCUMENTS */}
			<section id="documents" className="section">
				<div className="align-element">
					<SectionTitle text="Non-profit-org documentation" />
					<Documents />
				</div>
			</section>
		</main>
	);
};

export default About;
