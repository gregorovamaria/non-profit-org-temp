import React from "react";
import { SectionTitle, Button, Support } from "../index";

const SupportInfo = () => {
	return (
		<>
			<SectionTitle text="How can you help?" />
			<Support />
			<Button url="support" text="More..." />
		</>
	);
};

export default SupportInfo;
