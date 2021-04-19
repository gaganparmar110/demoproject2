import React, { useEffect, useState } from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Input, Form, Upload, Button, Select } from "antd";
import { MODAL_TYPES } from "Helpers";
import Api from "Helpers/ApiHandler";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
export default function Drawer(props) {
	let [form] = Form.useForm(),
		[companies, setCompanies] = useState([]),
		[loading, setLoading] = useState(false);

	const newProps = {
		defaultFileList: [
			{
				uid: "1",
				name: props.data.image ? props.data.image : "",
				status: "done",
				url: props.data.image
					? `https://openxcell-development-public.s3.amazonaws.com/instant-input/members/thumb/${props.data.image}`
					: "",
			},
		],
	};

	useEffect(() => {
		if (props.type === "ADD") getCompanies();
		// eslint-disable-next-line
	}, []);

	async function getCompanies(searchProp) {
		try {
			setLoading(true);
			const config = {
				data: {
					forDropDown: true,
					perPage: 10,
					pageNo: 1,
					search: [
						{
							field: "name",
							value: searchProp ? searchProp : "",
						},
					],
					sort: {
						field: "name",
						order: "asc",
					},
				},
				returnUnhandledError: true,
				returnError: true,
			};
			let response = await new Api().post("company/list", config);
			response.data.list.forEach((element) => {
				element.nameOther = element.name;
			});
			setCompanies(response.data.list);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log("error:", error);
		}
	}

	function onComapnySearch(val) {
		getCompanies(val);
	}

	async function formSubmit(values) {
		let formData = new FormData();
		if (props.type === "EDIT" && props.data.id) {
			formData.append("id", props.data.id);
		}
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
			let url = "member/",
				config = {
					data: formData,
					returnUnhandledError: true,
					returnError: true,
				};
			if (props.type === MODAL_TYPES.ADD) {
				await new Api().post(url, config);
			} else {
				await new Api().put(url, config);
			}
			setLoading(false);
			props.onSuccess(props.type, { ...props.data, ...values });
		} catch (error) {
			setLoading(false);
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
					<Input size="large" placeholder="FirstName" />
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
					<Input size="large" placeholder="LastName" />
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
					<Input type="email" size="large" placeholder="Email" />
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
					]}
				>
					<Input type="number" size="large" placeholder="Phone" />
				</Form.Item>

				{props.type === "ADD" ? (
					<>
						<Form.Item
							name="companyId"
							label="Company"
							labelCol={{ span: 24 }}
						>
							<Select
								showSearch
								autoFocus
								placeholder="Select a Company"
								optionFilterProp="children"
								onSearch={onComapnySearch}
								loading={loading}
							>
								{companies.map((item, index) => (
									<Option value={item.id} key={index}>
										{item.name}
									</Option>
								))}
							</Select>
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
					<Form.Item
						name="image"
						label="Profile Image"
						labelCol={{ span: 24 }}
						valuePropName="list"
					>
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
					</Form.Item>
				)}
			</Form>
		</SideDrawer>
	);
}
