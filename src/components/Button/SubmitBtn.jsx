import React from "react";
import { useNavigation, useFormAction } from "react-router-dom";

const SubmitBtn = ({ text, className, formId }) => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<button
			formAction={useFormAction(formId)}
			type="submit"
			className={`btn btn-primary btn-block uppercase ${className}`}
			disabled={isSubmitting}
		>
			{isSubmitting ? (
				<>
					<span className="loading loading-spinner"></span>
					sending...
				</>
			) : (
				text || "submit"
			)}
		</button>
	);
};

export default SubmitBtn;
