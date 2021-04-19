import React from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Input, Form } from "antd";

export default function Drawer(props) {
  return (
    <SideDrawer {...props}>
      <Form
        id={props.formId}
        className="form-container"
        initialValues={{
          city_name: props.title.includes("Edit") ? "Ahmedabad" : "",
          city_code: props.title.includes("Edit") ? "AH" : "",
        }}
        // onFinish    = {login}
      >
        <Form.Item
          name="city_name"
          rules={[{ required: true, message: "Please input your city name!" }]}
        >
          <Input size="large" placeholder="City Name" />
        </Form.Item>
        <Form.Item
          name="city_code"
          rules={[{ required: true, message: "Please input your city code!" }]}
        >
          <Input size="large" placeholder="City Code" />
        </Form.Item>
      </Form>
    </SideDrawer>
  );
}
