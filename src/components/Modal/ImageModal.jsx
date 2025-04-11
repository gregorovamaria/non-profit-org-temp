import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// state
import { setImageAttributes } from "../../features/images/imagesSlice";

// icons
import { IoMdClose } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const ImageModal = () => {
	const dispatch = useDispatch();
	const { src, index, allImages, numberOfImages } = useSelector(
		(state) => state.imagesState
	);

	return (
		<dialog id="modal-dialog" className="modal bg-slate-900">
			<div className="flex justify-between items-center relative">
				<div className="modal-action absolute -top-6 -left-10 sm:-left-14 md:-left-18 lg:-left-20">
					<div method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button
							type="button"
							className="btn btn-circle mr-12 text-2xl"
							onClick={() => document.getElementById("modal-dialog").close()}
						>
							<IoMdClose />
						</button>
					</div>
				</div>
				{index > 0 && (
					<Link
						to={`#slide${index - 1}`}
						className="btn btn-circle mr-12 absolute -left-10 sm:-left-14 md:-left-18 lg:-left-20"
						onClick={() => {
							dispatch(
								setImageAttributes({
									src: allImages[index - 1],
									index: index - 1,
								})
							);
						}}
					>
						<MdNavigateBefore className="text-2xl" />
					</Link>
				)}
				<img
					src={src}
					className="w-[724px] h-[624px] max-w-[80vw] max-h-[90vh] object-cover object-center m-auto"
				/>
				{index < numberOfImages.numberOfImages - 1 && (
					<Link
						to={`#slide${index + 1}`}
						className="btn btn-circle ml-12 absolute -right-10 sm:-right-14 md:-right-18 lg:-right-20 "
						onClick={() => {
							dispatch(
								setImageAttributes({
									src: allImages[index + 1],
									index: index + 1,
								})
							);
						}}
					>
						<MdNavigateNext className="text-2xl" />
					</Link>
				)}
			</div>
		</dialog>
	);
};

export default ImageModal;
