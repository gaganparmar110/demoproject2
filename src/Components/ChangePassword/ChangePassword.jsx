import React, { useState } from "react";
import {
	Input,
	Form,
    Button
} from "antd";
import { MODAL_TYPES } from "Helpers";
import Api from "Helpers/ApiHandler";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import {
  Card,
  PageTitle,
} from "Components/Commons/Commons";
// STYLES
import { Wrapper } from "./ChangePassword.style";

export default function ChangePassword() {
	let [form] = Form.useForm(),
		[loading, setLoading] = useState(false);

	// async function formSubmit(values) {
	// 	let formData = new FormData();
	// 	let dataValues = { ...values };
	// 	Object.entries(dataValues).forEach(([key, value]) => {
	// 				formData.append(key, value);
	// 	});

	// 	try {
	// 		setLoading(true);
	// 		let config = {
	// 				data: formData,
	// 				returnUnhandledError: true,
	// 				returnError: true,
	// 				headers: {
	// 					"Content-Type": "multipart/form-data",
	// 				},
	// 			}
    //         await new Api().put(url + `/${props.data.id}`, config);
	// 		setLoading(false);
	// 	} catch (error) {
	// 		setLoading(false);
	// 		console.log(
	// 			"TCL ~ file: Drawer.jsx ~ line 25 ~ formSubmit ~ error",
	// 			error
	// 		);
	// 	}
	// }

    	const formItemLayout = {
			wrapperCol: {
				xs: {
					span: 6,
					offset: 0,
				},
				sm: {
					span: 8,
					offset: 0,
				},
				xl: {
                    span: 10,
					offset: 0,
				},
			},
		};

	return (
         <Wrapper>
      <Card spacing={24}>
        <div className="title-wrapper flex">
          <PageTitle>Change Password</PageTitle>
          </div>
				<Form
                {...formItemLayout}
					// id={props.formId}
					form={form}
					className="form-container"
					// onFinish={formSubmit}
					// initialValues={{
					// }}
				>
                    <Form.Item
								name="old_password"
								labelCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message: "Please input your old password!",
									},
								]}
							>
                                <Input.Password
									placeholder="Old Password"
									size="large"
									iconRender={(visible) =>
										visible ? (
											<EyeTwoTone />
										) : (
											<EyeInvisibleOutlined />
										)
									}
								/>
							</Form.Item>
							<Form.Item
								name="new_password"
								labelCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message: "Please input your new password!",
									},
									{
										min: 6,
										message:
											"New Password must be minimum 6 characters.",
									},
								]}
							>
								<Input.Password
									placeholder="New Password"
									size="large"
									iconRender={(visible) =>
										visible ? (
											<EyeTwoTone />
										) : (
											<EyeInvisibleOutlined />
										)
									}
								/>
							</Form.Item>
							<Form.Item
								name="confirm"
								dependencies={["new_password"]}
								rules={[
									{
										required: true,
										message:
											"Please confirm your password!",
									},
									({ getFieldValue }) => ({
										validator(rule, value) {
											if (
												!value ||
												getFieldValue("new_password") ===
													value
											) {
												return Promise.resolve();
											}
											return Promise.reject(
												"Confirm Password do not match with new password!"
											);
										},
									}),
								]}
							>
								<Input.Password
									placeholder="Confirm Password"
									size="large"
									iconRender={(visible) =>
										visible ? (
											<EyeTwoTone />
										) : (
											<EyeInvisibleOutlined />
										)
									}
								/>
							</Form.Item>
							<Form.Item>
									<Button
										className="submitButton"
										loading={loading}
										type="primary"
										htmlType="submit"
									>
										Save
									</Button>
								</Form.Item>
				</Form>
                </Card>
                </Wrapper>
	);
}
