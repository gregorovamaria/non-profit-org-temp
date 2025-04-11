import React from "react";
import { SupportDetails, SectionTitle, SubSectionTitle } from "../components";
import { contactInfo } from "../utils/data";

const Support = () => {
	const { name, orgType, address, ico, email } = contactInfo[0];

	return (
		<main>
			{/* HOW DO WE HELP */}
			<section className="section">
				<div className="align-element">
					<SectionTitle text="How do we help?" />
					<SupportDetails />
				</div>
			</section>

			{/* 2% TAX */}
			<section className="section">
				<div className="align-element">
					<SectionTitle text="2% tax" />
					<SubSectionTitle text="Important information" />
					<p className="tracking-wide">
						<span className="font-bold text-primary">Name: </span>
						{name}
					</p>
					<p>
						<span className="font-bold text-primary">Org. form: </span>
						{orgType}
					</p>
					<p>
						<span className="font-bold text-primary">Address: </span>
						{address}
					</p>
					<p>
						<span className="font-bold text-primary">ID#: </span>
						{ico}
					</p>
				</div>
			</section>
		</main>
	);
};

export default Support;
