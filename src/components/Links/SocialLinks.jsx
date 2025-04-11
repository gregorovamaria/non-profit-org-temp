import React from "react";
import { NavLink } from "react-router-dom";
import { socialLinks } from "../../utils/data";

const SocialLinks = () => {
	return (
		<>
			{socialLinks.map((link) => {
				const { id, url, icon } = link;
				return (
					<li key={id}>
						<NavLink
							to={url}
							target="_blank"
							className="text-2xl hover:text-primary"
						>
							{icon}
						</NavLink>
					</li>
				);
			})}
		</>
	);
};

export default SocialLinks;
