import React from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Select, Input, Form } from "antd";

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
      <Option value="91">+91</Option>
    </Select>
  </Form.Item>
);

export default function Drawer(props) {
  return (
    <SideDrawer {...props}>
      <Form
        id={props.formId}
        className="form-container"
        initialValues={{
          prefix: "91",
          first_name: props.title.includes("Edit") ? "test user" : "",
          last_name: props.title.includes("Edit") ? "One" : "",
          email: props.title.includes("Edit") ? "testuser1@instantinput.com" : "",
          phone: props.title.includes("Edit") ? "0123456789" : "",
          address: props.title.includes("Edit") ? "Ahmedabad India" : "",
        }}
        // onFinish    = {login}
      >
        <Form.Item
          name="first_name"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input size="large" placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="last_name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input size="large" placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
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
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input
            size="large"
            placeholder="Phone"
            addonBefore={prefixSelector}
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input.TextArea size="large" placeholder="Address" />
        </Form.Item>
      </Form>
    </SideDrawer>
  );
}
