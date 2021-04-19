import React, { Component } from "react";
import { Form, Input, Modal, Tag } from "antd";
import ApiHandler from "Helpers/ApiHandler";
import EmailEditor from "react-email-editor";
import { TEMPLATE_TYPES } from "Helpers/Constants";

const { TextArea } = Input;

class HandleEditTemplateModal extends Component {
	constructor(props) {
		super(props);
		this.api = new ApiHandler();
		this.editor = null;
		this.state = {
			isLoading: false,
			editorState: null,
			title: this.props.editModal.data.title,
			content: this.props.editModal.data.content,
		};
	}
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	render() {
		let { visible, data, type } = this.props.editModal;
		const { isLoading/* , editorState */ } = this.state;
		// const onEditorStateChange = (editorState) => {
		// 	this.setState({ editorState });
		// };

		return (
			<Modal
				title="Edit template"
				visible={visible}
				onOk={this.handleSubmit}
				width={1200}
				onCancel={() => this.handleClose(false)}
				okText={"Update"}
				confirmLoading={isLoading}
			>
				<Tag color="red">
					Note: Please do not change any word which is enclosed in
					braces {"{ }"}
				</Tag>
				<Form className="form-container" initialValues={data}>
					<Form.Item
						name="title"
						label="Title"
						rules={[
							{
								required: true,
								message: "Please input your title!",
							},
						]}
					>
						<Input
							name="title"
							size="large"
							placeholder="Title"
							onChange={this.handleChange}
						/>
					</Form.Item>
					<Form.Item
						name="content"
						label="Content"
						rules={[
							{
								required: true,
								message: "Please input your content!",
							},
						]}
					>
						{type.toUpperCase() === TEMPLATE_TYPES.EMAIL ? (
							<EmailEditor
								ref={(editor) => (this.editor = editor)}
								onLoad={this.onEditorLoad}
							/>
						) : (
							<TextArea
								name="content"
								rows={4}
								placeholder="content"
								onChange={this.handleChange}
							/>
						)}
					</Form.Item>
				</Form>
			</Modal>
		);
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		this.setState({ isLoading: true });
		let { type } = this.props.editModal;
		let values = {};
		if (type.toUpperCase() === TEMPLATE_TYPES.EMAIL) {
			await this.editor.saveDesign();
			await this.editor.exportHtml((tempData) => {
				const { design, html } = tempData;
				values.content = html;
				values.json = JSON.stringify(design);
				this.editTemplate(values);
			});
		} else {
			this.editTemplate();
		}
	};

	editTemplate = async (values) => {
		let dataValues = {};
		let { type, id } = this.props.editModal.data;
		if (type === "NOTIFICATION") {
			dataValues = {
				title: this.state.editorState
					? this.state.editorState
					: this.state.title,
				content: this.state.content,
			};
		} else {
			dataValues = { ...values };
			dataValues.title = this.state.title;
		}
		try {
			// API CALLED FOR EDIT
			await this.api.put(`template/${id}`, {
				data: dataValues,
			});
			this.setState({ isLoading: false });
			this.handleClose(true);
		} catch (error) {
			this.setState({ isLoading: false });
			console.error("editTemplate -> error", error);
		}
	};

	handleClose = (shouldRefreshData) => {
		this.props.closeModal(shouldRefreshData);
	};

	onEditorLoad = () => {
		let { json } = this.props.editModal.data;
		if (!this.editor)
			setTimeout(() => this.editor.loadDesign(JSON.parse(json)), 3000);
		else this.editor.loadDesign(JSON.parse(json));
	};
}

export default HandleEditTemplateModal;
