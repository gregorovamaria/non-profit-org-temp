// icons
import { FaFacebook, FaInstagram } from "react-icons/fa";

// Daisy UI THEMES
export const themes = {
	light: "nord",
	dark: "night",
};

// NAVLINKS
export const navLinks = [
	{ id: 1, url: "/", text: "home" },
	{ id: 2, url: "about", text: "About" },
	{ id: 3, url: "blogs", text: "Blogs" },
	{ id: 4, url: "contact", text: "Contact" },
	{ id: 5, url: "support", text: "Support Us" },
];

// SOCIAL LINKS
export const socialLinks = [
	{
		id: 1,
		url: "#",
		icon: <FaFacebook />,
	},
	{
		id: 2,
		url: "#",
		icon: <FaInstagram />,
	},
];

// CONTACT INFO
export const contactInfo = [
	{
		name: "Non-profit Organization Temp",
		orgType: "Non-profit Organization",
		address: "Street 123, 12345 City, State",
		ico: "123456789",
		email: "non-profit-org-temp@gmail.com",
	},
];

// RICH TEXT EDITOR TOOLBAR
export const toolbar = {
	options: [
		"history",
		"inline",
		"blockType",
		"fontSize",
		// "fontFamily",
		"list",
		"textAlign",
		"link",
		// "colorPicker",
		"embedded",
		"emoji",
		"image",
		"remove",
	],
	history: { inDropdown: false },
	inline: { inDropdown: false },
	blockType: { inDropdown: true },
	list: { inDropdown: true },
	textAlign: { inDropdown: true },
	link: { inDropdown: true },
};

// NUMBER OF SLIDES FOR CAROUSEL
export const numOfSlides = 4;

// PAGINATION LIMIT
export const pageSize = 6;

// TEAM MEMBERS
export const teamMembers = [
	{
		id: 1,
		name: "Jane",
		avatar: "female",
		role: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, quam.",
		phone: null,
	},
	{
		id: 2,
		name: "John",
		avatar: "male",
		role: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, quam.",
		phone: null,
	},
	{
		id: 3,
		name: "Betka",
		avatar: "female",
		role: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, quam.",
		phone: null,
	},
];
