import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// state
import {
	setImageAttributes,
	setImages,
} from "../../features/images/imagesSlice";
import { openImgModal } from "../../features/modal/modalSlice";

import { getImagesLocal } from "../../utils/index_local";
// icons
import { FaRegTrashCan } from "react-icons/fa6";

const ImagesList = ({ type }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const { numberOfImages } = useSelector((state) => state.imagesState);
	const images = [];

	const getImg = (index) => {
		const src = document.getElementById(`image${index}`).src;
		dispatch(setImageAttributes({ src: src, index: index - 1 }));
	};

	const getAllImg = (list) => {
		list.map((index) => {
			const src = document.getElementById(`image${index}`).src;
			images.push(src);
		});
		dispatch(setImages(images));
	};

	const list = [];
	for (let i = 1; i <= numberOfImages.numberOfImages; i++) {
		list.push(i);
	}

	const imagesByBlogID = getImagesLocal();
	const source = imagesByBlogID[type];

	return (
		<>
			{list.length > 0 &&
				list.map((index) => {
					return (
						<div
							key={`slide${index}`}
							id={`slide${index + 1}`}
							className="relative"
						>
							<img
								id={`image${index}`}
								className="w-full h-full max-h-32 sm:max-h-56 md:max-h-72 object-cover object-center cursor-pointer border-white border-8"
								onClick={() => {
									document.getElementById("modal-dialog").showModal();
									getImg(index);
									getAllImg(list);
								}}
								src={source[index - 1]}
							/>
							{type === "blogForm" && (
								<label
									htmlFor="my_image_modal"
									className="absolute top-6 right-2 cursor-pointer hover:scale-150 hover:text-red-700 transition-all duration-300"
									onClick={() => {
										dispatch(openImgModal({ id: params.id, index: index }));
									}}
								>
									<FaRegTrashCan />
								</label>
							)}
						</div>
					);
				})}
		</>
	);
};

export default ImagesList;
