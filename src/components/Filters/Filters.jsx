import React from "react";
import { Form, useLoaderData, Link } from "react-router-dom";
import { FormInput, FormSelect, FormDate, SubmitBtn } from "../../components/";
import { FcSearch } from "react-icons/fc";

const Filters = () => {
	const { params } = useLoaderData();
	const { search, dateFrom, dateTo, order } = params;

	return (
		<Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
			{/* SEARCH */}
			<FormInput
				type="search"
				label="search"
				name="search"
				inputClassName="input-sm"
				placeholder="search"
				defaultValue={search}
				svg={<FcSearch />}
			/>

			{/* DATE FROM*/}
			<FormDate
				label="From"
				name="dateFrom"
				defaultValue={dateFrom}
				size="date-input-sm"
			/>

			{/* DATE TO*/}
			<FormDate
				label="To"
				name="dateTo"
				defaultValue={dateTo}
				size="date-input-sm"
			/>

			{/* ORDER */}
			<FormSelect
				label="Order by"
				name="order"
				list={["a-z", "z-a", "Latest", "Oldest"]}
				defaultValue={order}
				size="select-sm"
			/>

			{/* BUTTONS */}
			<SubmitBtn text="Search" className="btn-sm capitalize" />
			<Link to="/blogs" className="btn btn-accent btn-sm capitalize">
				Cancel
			</Link>
		</Form>
	);
};

export default Filters;
