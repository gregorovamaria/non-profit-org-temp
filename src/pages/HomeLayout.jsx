import React from "react";
import { Outlet, useNavigation, ScrollRestoration } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import {
	Navbar,
	Footer,
	Loading,
	Modal,
	ScrollToTop,
	DeleteImageModal,
} from "../components";

const HomeLayout = () => {
	const navigation = useNavigation();
	const isPageLoading = navigation.state === "loading";
	const { isOpen, isImgOpen } = useSelector((store) => store.modalState);

	return (
		<>
			{isImgOpen && <DeleteImageModal />}
			{isOpen && <Modal />}
			<Navbar />
			{isPageLoading ? <Loading /> : <Outlet />}
			<Footer />
			<ScrollToTop />
			<ScrollRestoration />
		</>
	);
};

export default HomeLayout;
