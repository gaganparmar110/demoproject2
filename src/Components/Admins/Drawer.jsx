import React, { useState } from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Input, Form } from "antd";
import { MODAL_TYPES } from "Helpers";
import Api from "Helpers/ApiHandler";

export default function Drawer(props) {
	let [form] = Form.useForm(),
		[loading, setLoading] = useState(false);

	async function formSubmit(values) {
		try {
			setLoading(true);
			let url = "admin/",
				config;
			if (props.type === MODAL_TYPES.ADD) {
				config = { data: values, returnUnhandledError: true };
				await new Api().post(url, config);
			} else {
				config = { data: values, returnUnhandledError: true };
				await new Api().put(url + `/${props.data.id}`, config);
			}
			setLoading(false);
			props.onSuccess(props.type, { ...props.data, ...values });
		} catch (error) {
			console.log(
				"TCL ~ file: Drawer.jsx ~ line 25 ~ formSubmit ~ error",
				error
			);
		}
	}

	return (
		<SideDrawer
			loading={loading}
			onConfirm={() => {
				form.submit();
			}}
			{...props}
		>
			<Form
				id={props.formId}
				form={form}
				className="form-container"
				onFinish={formSubmit}
				initialValues={props.data}
			>
				<Form.Item
					name="name"
					label="Name"
					labelCol={{ span: 24 }}
					rules={[
						{ required: true, message: "Please input your name!" },
					]}
				>
					<Input size="large" placeholder="Name" />
				</Form.Item>
				{props.type === "ADD" ? (
					<>
						<Form.Item
							name="email"
							label="Email"
							labelCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message: "Please input your email!",
								},
								{
									type: "email",
									message: "Please input valid email!",
								},
							]}
						>
							<Input
								type="email"
								size="large"
								placeholder="Email"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							label="Password"
							labelCol={{ span: 24 }}
							rules={[
								{
									min: 6,
									message:
										"Please input min 6 character password!",
								},
								{
									max: 16,
									message:
										"Please input less than 16 character password!",
								},
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input.Password
								size="large"
								placeholder="password"
							/>
						</Form.Item>
					</>
				) : (
					""
				)}
			</Form>
		</SideDrawer>
	);
}
