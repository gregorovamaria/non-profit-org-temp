import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// state
import { closeImgModal } from "../../features/modal/modalSlice";

// utils
import { deleteImage } from "../../utils/index";

const DeleteImageModal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { imgForDeletion } = useSelector((state) => state.modalState);

	const handleRemoveImage = (id, index) => {
		const imageName = document
			.getElementById(`image${index}`)
			.src.replaceAll("%2F", "/")
			.split("/")
			.pop()
			.split(".")[0]
			.replaceAll("%20", " ");

		const imageType = document
			.getElementById(`image${index}`)
			.src.split(".")
			.at(-1)
			.split("?")[0];

		deleteImage(id, imageName, imageType);
	};

	return (
		<>
			<input type="checkbox" id="my_image_modal" className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Delete photo?</h3>
					<div className="modal-action">
						<div
							htmlFor="my_image_modal"
							className="btn btn-outline border-primary hover:btn-primary"
							onClick={() => {
								dispatch(closeImgModal());
								handleRemoveImage(imgForDeletion.id, imgForDeletion.index);
								navigate(`/blogs/${imgForDeletion.id}`);
							}}
						>
							Confirm
						</div>
						<div
							htmlFor="my_image_modal"
							className="btn btn-outline border-error hover:btn-error"
							onClick={() => dispatch(closeImgModal())}
						>
							Cancel
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteImageModal;
