import React from "react";

const FormDate = ({ label, name, defaultValue, size }) => {
	return (
		<div className="form-control">
			<label htmlFor={name} className="label">
				<span className="label-text text-xs">{label}</span>
			</label>
			<input
				type="date"
				name={name}
				id={name}
				// placeholder="dd-mm-yyyy"
				defaultValue={defaultValue}
				className={`input input-bordered ${size}`}
			></input>
		</div>
	);
};

export default FormDate;
