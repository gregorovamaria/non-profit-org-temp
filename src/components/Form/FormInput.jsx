import React from "react";
import { useDispatch } from "react-redux";
import { toggleShowPassword } from "../../features/user/userSlice";

const FormInput = ({
	label,
	type,
	name,
	placeholder,
	defaultValue,
	svg,
	eye,
	className,
	inputClassName,
	onChange,
}) => {
	const dispatch = useDispatch();

	return (
		<div className={`form-control ${className}`}>
			<label className="label">
				<span className="text-xs capitalize">{label}</span>
			</label>
			<label
				className={`input input-bordered grid grid-cols-[1rem_minmax(12rem,_1fr)_1rem] items-center gap-2 capitalize ${inputClassName}`}
			>
				{svg && <div>{svg}</div>}
				<input
					type={type}
					name={name}
					placeholder={placeholder}
					defaultValue={defaultValue}
					onChange={onChange}
				/>
				<button
					type="button"
					className="grid justify-self-end"
					onClick={() => {
						dispatch(toggleShowPassword());
					}}
				>
					{eye}
				</button>
			</label>
		</div>
	);
};

export default FormInput;
