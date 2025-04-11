import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// data
import { pageSize } from "../../utils/data";
import { setPagination } from "../../features/pagination/paginationSlice";

const PaginationContainer = () => {
	const dispatch = useDispatch();
	const { blogsDetails } = useLoaderData();
	const { page } = useSelector((store) => store.paginationState);
	// console.log(page);

	const pageCount = Math.ceil(blogsDetails.totalCount / pageSize);
	// console.log(pageCount);

	// const pages = Array.from({ length: pageCount }, (_, index) => {
	// 	return index + 1;
	// });

	// console.log("pagination", lastVisible);
	const { search, pathname } = useLocation();
	const navigate = useNavigate();

	const handlePageChange = ({ pageNumber, id }) => {
		console.log(pageNumber, id);
		if (id === "next") {
			dispatch(
				setPagination({
					page: pageNumber,
					direction: id,
					lastVisible: blogsDetails.newLastVisible,
				})
			);
		}
		if (id === "prev") {
			dispatch(
				setPagination({
					page: pageNumber,
					direction: id,
					lastVisible: blogsDetails.newLastVisible,
				})
			);
		}

		const searchParams = new URLSearchParams(search);
		searchParams.set("page", pageNumber);
		navigate(`${pathname}?${searchParams.toString()}`);
	};

	if (pageCount < 2) return null;

	return (
		<div className="mt-16 flex justify-end">
			<div className="join">
				{/* PREV */}
				{page > 1 && (
					<button
						className="btn btn-xs sm:btn-md join-item"
						onClick={() => {
							let prevPage = page - 1;
							handlePageChange({ pageNumber: prevPage, id: "prev" });
						}}
					>
						Prev
					</button>
				)}
				{/* NEXT */}
				{page < pageCount && (
					<button
						className="btn btn-xs sm:btn-md join-item"
						onClick={() => {
							let nextPage = page + 1;
							handlePageChange({ pageNumber: nextPage, id: "next" });
						}}
					>
						Next
					</button>
				)}
			</div>
		</div>
	);
};
export default PaginationContainer;
