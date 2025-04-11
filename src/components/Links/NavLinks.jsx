import React from "react";
import { NavLink } from "react-router-dom";

import { navLinks } from "../../utils/data";

const NavLinks = () => {
	return (
		<>
			{navLinks.map((link) => {
				const { id, url, text } = link;
				return (
					<li key={id}>
						<NavLink
							to={url}
							className="capitalize text-base hover:text-primary"
						>
							{text}
						</NavLink>
					</li>
				);
			})}
		</>
	);
};

export default NavLinks;
