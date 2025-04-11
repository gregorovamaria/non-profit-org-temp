import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// state
import { closeModal } from "../../features/modal/modalSlice";
import { clearAllBlogs, deleteBlog } from "../../features/blogs/blogsSlice";

const Modal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { allBlogs, id } = useSelector((store) => store.modalState);
	const { totalCount } = useSelector((state) => state.blogsState);

	return (
		<>
			<input type="checkbox" id="my_modal" className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						{allBlogs ? "Delete all blogs from database?" : "Delete blog?"}
					</h3>
					<div className="modal-action">
						<div
							htmlFor="my_modal"
							className="btn btn-outline border-primary hover:btn-primary"
							onClick={(e) => {
								dispatch(closeModal());
								{
									allBlogs
										? dispatch(clearAllBlogs())
										: dispatch(deleteBlog(id));
								}
								e.preventDefault();
								navigate("/blogs");
							}}
						>
							Confirm
						</div>
						<div
							htmlFor="my_modal"
							className="btn btn-outline border-error hover:btn-error"
							onClick={() => dispatch(closeModal())}
						>
							Cancel
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
