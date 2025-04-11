import React from "react";
import { SectionTitle, Button, AboutUs } from "../index";

const AboutInfo = () => {
	return (
		<>
			<SectionTitle text="About" />
			<AboutUs />
			<Button url="about" text="More..." />
		</>
	);
};

export default AboutInfo;
