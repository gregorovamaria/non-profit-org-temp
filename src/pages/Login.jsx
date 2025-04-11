import { v4 as uuidv4 } from "uuid";

import React from "react";
import { Form, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormInput, SubmitBtn } from "../components";

// state
import { loginUser } from "../features/user/userSlice";

// toast
import { toast } from "react-toastify";

// icons
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export const action =
	(store) =>
	async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		try {
			if (
				import.meta.env.VITE_SOURCE === "local" &&
				import.meta.env.VITE_AUTH === "local"
			) {
				if (
					data.email === import.meta.env.VITE_USER &&
					data.password === import.meta.env.VITE_PASSWORD
				) {
					store.dispatch(
						loginUser({
							token: uuidv4(),
							email: data.email,
							uid: uuidv4(),
						})
					);
					toast.success("User was successfully logged in.");
				} else {
					console.log("error code: ", err.code, "error message: ", err.message);
					toast.error("Please check login details!");
				}
			} else {
				const { auth } = await import("../firebase/config");
				const { signInWithEmailAndPassword } = await import("firebase/auth");

				await signInWithEmailAndPassword(auth, data.email, data.password)
					.then((userCredential) => {
						store.dispatch(
							loginUser({
								token: userCredential.user.accessToken,
								email: userCredential.user.email,
								uid: userCredential.user.uid,
							})
						);
						toast.success("User was successfully logged in.");
					})
					.catch((err) => {
						console.log(
							"error code: ",
							err.code,
							"error message: ",
							err.message
						);
						toast.error("Please check login details!");
					});
			}
			// redirect only, if the login was successful
			if (store.getState().userState.user) {
				return redirect("/blogs");
			} else {
				return null;
			}
		} catch (error) {
			const errorMessage =
				error?.response?.data?.error?.message || "There was an error!";
			toast.error(errorMessage);
			return null;
		}
	};

const Login = () => {
	const { showPassword } = useSelector((store) => store.userState);

	const emailSvg = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			className="w-4 h-4 opacity-70"
		>
			<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
			<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
		</svg>
	);

	const passwordSvg = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			className="w-4 h-4 opacity-70"
		>
			<path
				fillRule="evenodd"
				d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
				clipRule="evenodd"
			/>
		</svg>
	);

	return (
		<main>
			<section className="section grid place-items-center">
				<div className="align-element">
					<Form
						method="post"
						className="card w-full sm:w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
					>
						<h1 className="text-center font-bold capitalize">Login</h1>
						{/* email */}
						<FormInput
							type="email"
							label="email"
							name="email"
							value=""
							placeholder="email"
							svg={emailSvg}
						/>
						{/* password */}
						<FormInput
							type={showPassword ? "text" : "password"}
							label="password"
							name="password"
							value=""
							placeholder="password"
							svg={passwordSvg}
							eye={
								showPassword ? (
									<FaRegEyeSlash className="text-slate-400" />
								) : (
									<FaRegEye className="text-slate-400" />
								)
							}
						/>
						<div className="mt-4">
							<SubmitBtn text="login" formId={""} />
						</div>
					</Form>
				</div>
			</section>
		</main>
	);
};

export default Login;
