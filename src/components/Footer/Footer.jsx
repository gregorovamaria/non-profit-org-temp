import React from "react";
import { NavLinks, SocialLinks } from "../index";

const date = new Date().getFullYear();

const Footer = () => {
	return (
		<footer className="bg-base-200 py-8 min-h-[136px]">
			{/* <footer className="bg-base-200 py-8 min-h-[136px] max-h-[136px]"> */}
			<div className="align-element grid gap-6 justify-items-center">
				{/* <div className="align-element flex flex-col flex-wrap items-center justify-center gap-6"> */}
				{/* NAVBAR CENTER - LINKS */}
				{/* flex flex-wrap justify-center gap-8 */}
				{/* <div className="flex flex-wrap">
					<ul className="menu menu-horizontal bg-base-200 w-full">
						<NavLinks />
					</ul>
				</div> */}
				{/* NAVBAR END */}
				<ul className="flex flex-wrap gap-8">
					<SocialLinks />
				</ul>
				<p className="text-xs xs:text-sm sm:text-base text-center">
					Copyright &copy; Non-profit organization temp <span>{date}</span>. All
					rights reserved
				</p>
			</div>
		</footer>
	);
};

export default Footer;
