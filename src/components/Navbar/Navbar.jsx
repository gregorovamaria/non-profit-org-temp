import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import { NavLinks } from "../index";

// icons + images
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered, FaArrowRightFromBracket } from "react-icons/fa6";
import logo from "../../../pictures/landingPage/logo_navbar.png";
import logo_dark from "../../../pictures/landingPage/logo_navbar_dark.png";

// state
import { toggleTheme } from "../../features/user/userSlice";
import useLogout from "../../hooks/useLogout";

// utils
import { downloadImage } from "../../utils";
import { themes } from "../../utils/data";

const Navbar = () => {
	// const [dropdownOpen, setDropDownOpen] = useState(false);
	const dispatch = useDispatch();
	const { user } = useSelector((store) => store.userState);
	const theme = useSelector((state) => state.userState.theme);
	const selectedTheme = Object.entries(themes).filter(
		(item) => item[1] === theme
	)[0][0];

	const { logout } = useLogout();

	const handleTheme = () => {
		dispatch(toggleTheme());
	};

	// DOWNLOAD	IMAGES FROM STORAGE
	// navbar logo
	let navbar_logo = "";

	if (import.meta.env.VITE_SOURCE != "local") {
		if (selectedTheme === "dark") {
			import("../../utils").downloadImage(
				"landing/logo_navbar_dark.png",
				"navbar-logo"
			);
		} else {
			import("../../utils").downloadImage(
				"landing/logo_navbar.png",
				"navbar-logo"
			);
		}
	} else if (import.meta.env.VITE_SOURCE === "local") {
		if (selectedTheme === "dark") {
			navbar_logo = logo_dark;
		} else {
			navbar_logo = logo;
		}
	}

	return (
		<nav id="navbar" className="bg-base-200 shadow sticky top-0 z-[9999]">
			<div className="navbar align-element">
				{/* NAVBAR START */}
				<div className="justify-start w-4/5">
					{/* TITLE - LOGO */}
					<NavLink to="/" className="hidden lg:flex text-2xl items-center">
						<img
							id="navbar-logo"
							alt="Non-profit-org"
							className="rounded-box h-full w-16 object-cover"
							src={navbar_logo}
						/>
						<h5 className="px-2 uppercase">
							<div
								className={`navbar-text ${selectedTheme === "dark" && "dark"}`}
							>
								Non-profit-org
							</div>
						</h5>
					</NavLink>

					{/* DROPDOWN */}
					<div className="dropdown dropdown-hover">
						<label
							tabIndex={0}
							role="button"
							className="btn btn-ghost m-1 lg:hidden"
						>
							<FaBarsStaggered className="h-6 w-6" />
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] menu menu-sm p-2 shadow bg-base-200 rounded-box w-52"
						>
							<NavLinks />
						</ul>
					</div>
				</div>

				{/* NAVBAR CENTER - LINKS */}
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal">
						<NavLinks />
					</ul>
				</div>

				{/* NAVBAR END */}
				<div className="navbar-end gap-2 m-1 md:gap-8">
					{/* THEME SETUP */}
					<label className="swap swap-rotate hover:text-primary">
						<input type="checkbox" onChange={handleTheme} />
						{/* sun icon */}
						<BsSunFill className="swap-on h-5 w-5" />
						{/* moon icon */}
						<BsMoonFill className="swap-off h-5 w-5" />
					</label>
					{/* <ul className="menu-horizontal gap-2">
						<SocialLinks />
					</ul> */}

					{/* LOGOUT */}
					{user && (
						<div className="h-full">
							<div onClick={logout}>
								<FaArrowRightFromBracket className="h-5 w-5 hover:text-primary cursor-pointer md:hidden" />
							</div>
							<div
								className="btn btn-outline btn-primary rounded-md w-20 hidden md:flex"
								onClick={logout}
							>
								Logout
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
