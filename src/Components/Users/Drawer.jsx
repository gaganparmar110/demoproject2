import React, { useState } from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Input, Form, Upload, Button } from "antd";
import { MODAL_TYPES } from "Helpers";
import Api from "Helpers/ApiHandler";
import { UploadOutlined } from "@ant-design/icons";

export default function Drawer(props) {
	const newProps = {
		defaultFileList: [
			{
				uid: "1",
				name: props.data.image ? props.data.image : "",
				status: "done",
				url: `https://openxcell-development-public.s3.amazonaws.com/instant-input/users/profile/thumb/${props.data.image}`,
			},
		],
	};
	let [form] = Form.useForm(),
		[loading, setLoading] = useState(false);

	async function formSubmit(values) {
		let formData = new FormData();

		Object.entries(values).forEach(([key, value]) => {
			if (key === "image") {
				if ((value.file && value.file.status) || !value) {
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
			let config = {
				data: formData,
				returnUnhandledError: true,
			};
			if (props.type === MODAL_TYPES.ADD)
				await new Api().post("users/sign-up", config);
			else await new Api().put(`users/profile/${props.data.id}`, config);
			setLoading(false);
			props.onSuccess(props.type, { ...props.data, ...values });
		} catch (error) {
			console.log(
				"TCL ~ file: Drawer.jsx ~ line 25 ~ formSubmit ~ error",
				error
			);
			setLoading(false);
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
						{
							required: true,
							message: "Please input your name!",
						},
					]}
				>
					<Input size="large" placeholder="Name" />
				</Form.Item>
				{props.type === MODAL_TYPES.ADD ? (
					<Form.Item
						name="email"
						label="Email"
						labelCol={{ span: 24 }}
						rules={[
							{
								type: "email",
								message: "Please enter valid email!",
							},
							{
								required: true,
								message: "Please input your email!",
							},
						]}
					>
						<Input size="large" placeholder="Email" />
					</Form.Item>
				) : (
					""
				)}
				<Form.Item
					name="userName"
					label="User Name"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your user name!",
						},
					]}
				>
					<Input size="large" placeholder="User Name" />
				</Form.Item>
				<Form.Item
					name="phone"
					label="Phone"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your phone number!",
						},
						{
							min: 8,
							message: "Phone must be minimum 8 digits.",
						},
						{
							max: 12,
							message: "Phone must be less than 12 digits.",
						},
					]}
				>
					<Input type="number" size="large" placeholder="Phone" />
				</Form.Item>
				<Form.Item
					name="zipCode"
					label="Zip Code"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your Zip Code!",
						},
					]}
				>
					<Input size="large" placeholder="Zip Code" />
				</Form.Item>
				{props.type === MODAL_TYPES.ADD ? (
					<Form.Item
						name="password"
						label="Password"
						labelCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
							{
								min: 6,
								message:
									"Password must be minimum 6 characters.",
							},
						]}
					>
						<Input.Password size="large" placeholder="password" />
					</Form.Item>
				) : (
					""
				)}

				<Form.Item
					name="image"
					label="Profile Image"
					labelCol={{ span: 24 }}
					valuePropName="list"
				>
					{props.data.image ? (
						<Upload
							{...newProps}
							name="logo"
							beforeUpload={() => false}
							listType="picture"
							maxCount={1}
						>
							<Button icon={<UploadOutlined />}>
								Click to Upload
							</Button>
						</Upload>
					) : (
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
					)}
				</Form.Item>
			</Form>
		</SideDrawer>
	);
}
