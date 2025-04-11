// import { getImages } from "../features/blogs/blogsSlice";
// import { useDispatch } from "react-redux";
// import { redirect } from "react-router-dom";

// firestore
import {
	collection,
	doc,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	getCountFromServer,
	query,
	orderBy,
	limit,
	limitToLast,
	where,
	startAfter,
	endBefore,
	// endAt,
	// QueryDocumentSnapshot,
	// QuerySnapshot,
} from "firebase/firestore";

// firebase cloud storage
import {
	ref,
	getDownloadURL,
	listAll,
	uploadBytes,
	deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/config";

// toast
import { toast } from "react-toastify";

// data
import { pageSize } from "./data";

// GET ALL BLOGS FROM DB
export const getBlogs = async ({ params, page, lastVisible, direction }) => {
	let field = "";
	let ordering = "";
	let results = [];
	let startPositionConstraints = [];
	let paginationLimit = [];
	const { search, dateFrom, dateTo, order } = params;
	const constraints = [];

	// console.log("index", lastVisible);

	// filters selected by users
	// ORDER BY
	if (!order || order === "Latest") {
		field = "date";
		ordering = "desc";
	}
	if (order === "a-z") {
		field = "title";
		ordering = "asc";
	}
	if (order === "z-a") {
		field = "title";
		ordering = "desc";
	}
	if (order === "Oldest") {
		field = "date";
		ordering = "asc";
	}

	// SEARCH
	if (search) {
		constraints.push(
			where("titleArray", "array-contains", search.toLowerCase())
		);
	}

	// DATE FROM - DATE TO
	let start = dateFrom ? new Date(`${dateFrom}`) : new Date("1900-01-01");
	let end = dateTo ? new Date(`${dateTo}`) : new Date();

	start = new Date(start.setHours(0, 0, 0, 0));
	end = new Date(end.setHours(23, 59, 59, 999));

	constraints.push(where("date", ">=", start));
	constraints.push(where("date", "<=", end));

	// PAGINATION - LAST VISIBLE
	// console.log(lastVisible);

	if (!lastVisible) {
		paginationLimit.push(limit(pageSize));
	}
	if (lastVisible) {
		if (direction === "next") {
			// console.log("next");
			startPositionConstraints.push(startAfter(lastVisible));
			paginationLimit.push(limit(pageSize));
		}
		if (direction === "prev") {
			// console.log("prev");
			startPositionConstraints.push(endBefore(lastVisible));
			paginationLimit.push(limitToLast(pageSize));
		}
	}
	// QUERY
	const querySnapshot = collection(db, "blogs");

	// total blogs from collection
	const snapshotTotalCount = await getCountFromServer(querySnapshot); // get count from filtered data
	const totalAllCount = snapshotTotalCount.data().count;
	// console.log(totalAllCount);

	// filter blogs
	const blogs = query(querySnapshot, orderBy(field, ordering), ...constraints);

	// total count of filtered blogs
	const snapshot = await getCountFromServer(blogs); // get count from filtered data
	const totalCount = snapshot.data().count;
	// console.log(totalCount);

	// console.log(startPositionConstraints);
	// console.log(paginationLimit);

	// pagination
	const paginatedBlogs = query(
		blogs,
		...paginationLimit,
		...startPositionConstraints
	);

	const querySnapshotBlogs = await getDocs(paginatedBlogs); // get blogs
	// console.log(querySnapshotBlogs);
	let newLastVisible = null;
	if (direction === "prev" || page * pageSize >= totalAllCount) {
		newLastVisible =
			querySnapshotBlogs.docs[querySnapshotBlogs.docs.length - 2];
	}
	if (direction === "next") {
		newLastVisible =
			querySnapshotBlogs.docs[querySnapshotBlogs.docs.length - 1];
	}

	// console.log(newLastVisible);

	// console.log(querySnapshotBlogs.docs[querySnapshotBlogs.docs.length - 1]);

	querySnapshotBlogs.forEach((doc) => {
		const formattedDate = doc.data().date.toDate();
		results.push({
			id: doc.id,
			date: formattedDate.toLocaleDateString("en-GB"),
			// src: doc.data().src,
			// alt: doc.data().alt,
			title: doc.data().title,
			info: doc.data().info,
			author: doc.data().author,
		});
	});

	return { results, totalCount, newLastVisible };
};

// GET SINGLE BLOG FROM DB
export const getSingleBlog = async (id) => {
	let results = [];
	const blog = await getDoc(doc(db, "blogs", id));

	if (blog.exists()) {
		const date = blog.data().date.toDate().toLocaleDateString("en-GB");
		results.push({
			id: blog.id,
			date: date,
			// src: blog.data().src,
			// alt: blog.data().alt,
			title: blog.data().title,
			info: blog.data().info,
			author: blog.data().author,
		});

		return results;
	} else {
		// blog.data() will be undefined in this case
		if (id !== "new") {
			toast.error("Blog has not been found");
		}
	}
};

// GET FILTERED BLOGS BY PARAMS
export const getFilteredData = async ({ limitNumber }) => {
	const results = [];

	const blogsRef = collection(db, "blogs");

	const blogs = query(
		blogsRef,
		orderBy("date", "desc"),
		limitNumber && limit(limitNumber)
	);

	const querySnapshot = await getDocs(blogs);
	querySnapshot.forEach((doc) => {
		const date = doc.data().date.toDate().toLocaleDateString("en-GB");
		results.push({
			id: doc.id,
			date: date,
			// src: doc.data().src,
			// alt: doc.data().alt,
			title: doc.data().title,
			info: doc.data().info,
			author: doc.data().author,
		});
	});

	return results;
};

// ADD NEW BLOG TO DB
export const addBlog = async (blogDetails) => {
	// console.log(blogDetails);
	let redirectionId = null;
	let getError = null;

	try {
		const ref = collection(db, "blogs");
		const returnedDoc = await addDoc(ref, blogDetails);
		// console.log(returnedDoc);
		redirectionId = returnedDoc.id;
		if (!returnedDoc) return;
		toast.success("Blog was successfully added to the database");
	} catch (error) {
		console.log(error);
		getError = {
			errorMessage: JSON.stringify(error.message),
			blogDetails: blogDetails,
		};
		toast.error("There was an error. Blog wasn't saved to the database!");
	}

	const output = { id: redirectionId, error: getError };
	return output;
};

// UPDATE EXISTING BLOG IN DB BY ID
export const updateBlog = async (blogID, blogDetails) => {
	let redirectionId = blogID;
	let getError = null;

	try {
		const docRef = doc(db, "blogs", blogID);
		await updateDoc(docRef, blogDetails);
		toast.success("Blog was successfully updated!");
	} catch (error) {
		console.log(JSON.stringify(error.message));
		getError = {
			errorMessage: JSON.stringify(error.message),
			blogDetails: blogDetails,
		};
		toast.error("There was an error. Blog wasn't saved to the database!");
	}

	const output = { id: redirectionId, error: getError };
	return output;
};

// DELETE EXISTING BLOG IN DB BY ID
export const deleteBlogById = async (blogID) => {
	// console.log(blogID);

	try {
		const docRef = doc(db, "blogs", blogID);
		await deleteDoc(docRef);
		toast.success("Blog was successfully deleted from the database!");
	} catch (error) {
		console.log(error);
		toast.error("There was an error. Blog wasn't deleted from the database!");
	}
};

// CAPITALIZE FIRST LETTER in string
export const capitalize = (text) => {
	return text && text[0].toUpperCase() + text.slice(1);
};

// GENERATE MONTHS
// export const generateMonths = () => {
// 	let months = ["všetko"];

// 	[...Array(12).keys()].map((key) =>
// 		months.push(
// 			capitalize(new Date(0, key).toLocaleString("sk", { month: "short" }))
// 		)
// 	);

// 	return months;
// };

// GENERATE ARRAY OF SUBSTRINGS
export const generateArrayOfSubstrings = (title) => {
	let searchTerm = title.toLowerCase();

	const separatedArrayByComma = searchTerm.split(", ");
	const separatedArrayByBlank = searchTerm.split(" ");

	const array = [];

	for (let i = 1; i < searchTerm.length + 1; i++) {
		array.push(searchTerm.substring(0, i));
	}

	const arrayByComma = [];
	separatedArrayByComma.forEach((item) => {
		for (let i = 1; i < item.length + 1; i++) {
			arrayByComma.push(item.substring(0, i));
		}
	});

	const arrayByBlank = [];
	separatedArrayByBlank.forEach((item) => {
		for (let i = 1; i < item.length + 1; i++) {
			arrayByBlank.push(item.substring(0, i));
		}
	});

	const mergedArray = array
		.concat(separatedArrayByComma)
		.concat(separatedArrayByBlank)
		.concat(arrayByComma)
		.concat(arrayByBlank);

	const newSet = new Set(mergedArray);
	// console.log(Array.from(newSet));
	return Array.from(newSet);
};

// DOWNLOAD IMAGE FROM STORAGE - display on page
export const downloadImage = (path, elementId) => {
	const pathReference = ref(storage, path);
	getDownloadURL(pathReference)
		.then((url) => {
			// console.log(url);
			const img = document.getElementById(elementId);
			img.setAttribute("src", url);
		})
		.catch((error) => {
			console.log(error);
		});
};

// DOWNLOAD ALL IMAGES
export const downloadImages = async (folder, type = "all", index = 0) => {
	// Create a reference under which you want to list
	const listRef = ref(storage, `blogs/${folder}`);

	const itemsRef = await listAll(listRef);

	// Use the result.
	const res = itemsRef.items;
	const numberOfImages = itemsRef.items.length;

	// get 1st image
	if (type === "1") {
		res.forEach((item, i) => {
			if (i === 0) {
				getDownloadURL(item)
					.then((url) => {
						const img = document.getElementById(`image${index}`);
						img.setAttribute("src", url);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		});
	}

	// get all images
	if (type === "all") {
		res.forEach((item, i) => {
			// console.log(item, i);
			getDownloadURL(item)
				.then((url) => {
					const img = document.getElementById(`image${i + 1}`);
					img.setAttribute("src", url);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}

	return { numberOfImages };
};

// UPLOAD IMAGE TO STORAGE
export const uploadImages = async (folder, files) => {
	// console.log("upload started");
	// console.log("orig", files);

	let getError = null;
	if (files == null) {
		getError = "No images selected!";
		toast.error("No images selected!");
		return;
	}

	const arrayOfImages = Array.from(files);
	// console.log(arrayOfImages);

	try {
		arrayOfImages.forEach((file) => {
			// console.log("orig file: ", file);
			const imageRef = ref(storage, `/blogs/${folder}/${file.name}`);
			uploadBytes(imageRef, file).then(() => {
				// console.log("image uploaded:", file);
			});
		});
	} catch (error) {
		console.log(error);
		getError = {
			errorMessage: JSON.stringify(error.message),
		};
	}

	return { error: getError };
};

// HANDLE FORM DATA - ADD BLOG / UPDATE BLOG // UPLOAD IMAGES
export const handleFormData = async (blogId, blogDetails, images) => {
	// let redirectionId = blogId ? blogId : null;

	try {
		if (blogId === "new") {
			// ADD NEW BLOG
			const { id, error } = await addBlog(blogDetails);
			if (error) return null;

			// UPLOAD IMAGE
			if (images) {
				const { error: uploadImgError } = await uploadImages(id, images);

				if (uploadImgError) {
					toast.error("Images haven't been saved to the storage!");
					return null;
				}

				toast.success("Images have been successfully saved to the storage!");

				// REDIRECT
				return { finished: "finished", error, uploadImgError };
			}
			return { finished: "finished", error };
		} else {
			// UPDATE EXISTING BLOG
			const { id, error } = await updateBlog(blogId, blogDetails);
			if (error) return null;

			// UPLOAD IMAGE
			if (images) {
				const { error: uploadImgError } = await uploadImages(id, images);

				if (uploadImgError) {
					toast.error("Images haven't been saved to the storage!");
					return null;
				}

				toast.success("Images have been successfully saved to the storage!");

				// REDIRECT
				// redirectionId = id ? id : null;
				return { finished: "finished", error };
			}

			return { finished: "finished", error };
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

// DELETE IMAGE FROM STORAGE
// Create a reference to the file to delete
export const deleteImage = (folder, imageName, imageType) => {
	const deleteImgRef = ref(
		storage,
		`blogs/${folder}/${imageName}.${imageType}`
	);

	// console.log(deleteImgRef);

	// Delete the file
	deleteObject(deleteImgRef)
		.then(() => {
			toast.success("Image was successfully deleted from the storage");
		})
		.catch((error) => {
			console.log(error);
			toast.error(
				"There was an error. Image was not deleted from the storage!"
			);
		});
};

// DELETE FOLDER FROM STORAGE
export const deleteFolderFromStorage = async (folder) => {
	const listRef = ref(storage, `blogs/${folder}`);
	const itemsRef = await listAll(listRef);

	// Use the result.
	const res = itemsRef.items;
	res.forEach((path) => {
		const deleteImgRef = ref(storage, path.fullPath);
		deleteObject(deleteImgRef);
	});
};

// GET ALL BLOGS BY ID
export const getAllBlogs = async () => {
	const results = [];

	const blogsRef = collection(db, "blogs");
	const querySnapshot = await getDocs(blogsRef);

	querySnapshot.forEach((doc) => {
		const date = doc.data().date.toDate().toLocaleDateString("en-GB");
		results.push({
			id: doc.id,
		});
	});

	return results;
};
