import React, { useState } from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Input, Form, Upload, Button } from "antd";
import { MODAL_TYPES } from "Helpers";
import Api from "Helpers/ApiHandler";
import { UploadOutlined } from "@ant-design/icons";

export default function Drawer(props) {
	let [form] = Form.useForm(),
		[loading, setLoading] = useState(false);

	async function formSubmit(values) {
		let formData = new FormData();

		Object.entries(values).forEach(([key, value]) => {
			if (key === "image") {
				if ((value && value.file && value.file.status) || !value) {
					formData.append(key, "");
				} else if (value.file) {
					formData.append(key, value.file);
				} else {
					formData.delete(key);
				}
			} else {
				formData.append(key, value);
			}
		});
		try {
			setLoading(true);
			let url = "company/",
				config;
			if (props.type === MODAL_TYPES.ADD) {
				config = { data: formData, returnUnhandledError: true };
				await new Api().post(url + "signup", config);
			} else {
				config = { data: values, returnUnhandledError: true };
				await new Api().put(
					url + `edit/${props.data.company_member.id}`,
					config
				);
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
				<Form.Item
					name="address"
					label="Address"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your address!",
						},
					]}
				>
					<Input size="large" placeholder="Address" />
				</Form.Item>
				<Form.Item
					name="area"
					label="Area"
					labelCol={{ span: 24 }}
					rules={[
						{ required: true, message: "Please input your area!" },
					]}
				>
					<Input size="large" placeholder="Area" />
				</Form.Item>
				<Form.Item
					name="city"
					label="City"
					labelCol={{ span: 24 }}
					rules={[
						{ required: true, message: "Please input your city!" },
					]}
				>
					<Input size="large" placeholder="City" />
				</Form.Item>
				<Form.Item
					name="country"
					label="Country"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your country!",
						},
					]}
				>
					<Input size="large" placeholder="Country" />
				</Form.Item>
				<Form.Item
					name="latitude"
					label="Latitude"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your latitude!",
						},
					]}
				>
					<Input size="large" placeholder="Latitude" />
				</Form.Item>
				<Form.Item
					name="longitude"
					label="Longitude"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your longitude!",
						},
					]}
				>
					<Input size="large" placeholder="Longitude" />
				</Form.Item>
				{props.type === "ADD" ? (
					<>
						<Form.Item
							name="firstName"
							label="First Name"
							labelCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message: "Please input your firstName!",
								},
							]}
						>
							<Input size="large" placeholder="First Name" />
						</Form.Item>
						<Form.Item
							name="lastName"
							label="Last Name"
							labelCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message: "Please input your lastName!",
								},
							]}
						>
							<Input size="large" placeholder="Last Name" />
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
							name="phone"
							label="Phone"
							labelCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message: "Please input your phone!",
								},
								{
									min: 8,
									message: "Phone must be minimum 8 digits.",
								},
								{
									max: 12,
									message:
										"Phone must be less than 12 digits.",
								},
							]}
						>
							<Input
								type="number"
								size="large"
								placeholder="Phone"
							/>
						</Form.Item>
						<Form.Item
							name="image"
							label="Profile Image"
							labelCol={{ span: 24 }}
							valuePropName="list"
						>
							<Upload
								name="logo"
								beforeUpload={() => false}
								listType="picture"
								maxCount={1}
							>
								<Button icon={<UploadOutlined />}>
									Click to Upload
								</Button>
							</Upload>
						</Form.Item>
					</>
				) : (
					""
				)}
			</Form>
		</SideDrawer>
	);
}
