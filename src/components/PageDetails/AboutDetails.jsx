import React from "react";
import SubSectionTitle from "../Titles/SubSectionTitle";
import Support from "../LandingInfo/Support";
import SupportDetails from "./SupportDetails";

const AboutDetails = () => {
	return (
		<div>
			<SubSectionTitle text="Our goals" />
			<p className="pb-4">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. A accusamus
				placeat, voluptatem eum facere vitae quidem commodi, recusandae itaque
				culpa debitis nihil praesentium doloribus excepturi, provident assumenda
				at. Modi, quod.
			</p>

			<SubSectionTitle text="How do we help?" />
			<SupportDetails />

			<SubSectionTitle text="How can you participate?" />
			<Support />
		</div>
	);
};

export default AboutDetails;
