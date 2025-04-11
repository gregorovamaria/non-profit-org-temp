import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa6";

function ScrollToTop() {
	const [showGoTop, setShowGoTop] = useState(false);

	//DISPLAY HANDLER
	const handleVisibleButton = () => {
		setShowGoTop(window.scrollY > 50);
	};

	const handleScrollUp = () => {
		window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		window.addEventListener("scroll", handleVisibleButton);
	}, []);

	return (
		<button
			className={
				showGoTop
					? `fixed bottom-5 right-5 rounded-full p-2 bg-transparent border-2 border-double border-primary hover:scale-110`
					: "hidden"
			}
			onClick={handleScrollUp}
		>
			<FaChevronUp />
		</button>
	);
}

export default ScrollToTop;
