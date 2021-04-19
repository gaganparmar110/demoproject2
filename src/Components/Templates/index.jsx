import React from "react";
import { Table, Tooltip, Select } from "antd";
import HandleContentModal from "./Modal/edit-template";
import ApiHandler from "../../Helpers/ApiHandler";
import { PAGINATION, TEMPLATE_TYPES } from "Helpers/Constants";
import { withRouter } from "react-router";
import { Card, PageTitle, ActionItem } from "Components/Commons/Commons";
import { Wrapper } from "./Templates.style";

const { Column } = Table;
const { Option } = Select;

class Templates extends React.Component {
	constructor(props) {
		super(props);
		this.api = new ApiHandler();
		this.state = {
			type: TEMPLATE_TYPES.EMAIL,
			templateList: [],
			tempType: "EMAIL",
			editModal: {
				visible: false,
				data: null,
			},
			isLoading: false,
			totalRecords: 0,
			perPage: PAGINATION.PER_PAGE,
			paginationInfo: {
				total: 0,
				current: 1,
			},
		};
	}

	componentDidMount = () => {
		let type = this.state.tempType;
		if (
			type.toUpperCase() === TEMPLATE_TYPES.NOTIFICATION ||
			type.toUpperCase() === TEMPLATE_TYPES.EMAIL
		) {
			type = this.state.tempType;
		} else {
			type = TEMPLATE_TYPES.EMAIL;
		}

		this.setState(
			{
				type,
				currentPage: 1,
			},
			() => {
				// GET TEMPLATE LIST
				this.getTemplates();
			}
		);
	};
	templateTypeHandle = (value) => {
		this.setState({ tempType: value });
	};
	getTemplates = async (currentPage = 1) => {
		this.setState({ isLoading: true });

		try {
			const { type, perPage } = this.state;
			const response = await this.api.post("template/list", {
				data: {
					type: type.toUpperCase(),
					perPage: perPage,
					pageNo: currentPage,
				},
			});

			response.data.list.map((template) => {
				template.key = template.id;
				return template;
			});

			this.setState({
				templateList: response.data.list,
				totalRecords: response.data.total,
				isLoading: false,
			});
		} catch (error) {
			this.setState({ isLoading: false });
			console.error(error);
		}
	};

	handleTableChange = (pagination) => {
		this.getTemplates(pagination.current);
	};

	render() {
		const { editModal } = this.state;

		return (
			<Wrapper>
				<Card spacing={24}>
					<div className="title-wrapper flex">
						<PageTitle>Templates Management</PageTitle>

						<div className="actions">
							<Select
								className="mr-1"
								showSearch
								autoFocus
								style={{ width: 200 }}
								placeholder="Select a Template Type"
								optionFilterProp="children"
								defaultValue={"EMAIL"}
								onChange={this.templateTypeHandle}
								loading={this.state.isLoading}
							>
								<Option value={"EMAIL"}>{"EMAIL"}</Option>
								<Option value={"NOTIFICATION"}>
									{"NOTIFICATION"}
								</Option>
							</Select>
						</div>
					</div>
					<div className="table-container">
						{this.templateListUI()}
					</div>
					{editModal.visible && (
						<HandleContentModal
							editModal={editModal}
							closeModal={(shouldRefreshData) =>
								this.toggleEditModal(null, shouldRefreshData)
							}
						/>
					)}
				</Card>
			</Wrapper>
		);
	}

	toggleEditModal = (data, shouldRefreshData) => {
		const { visible } = this.state.editModal;
		this.setState({
			editModal: {
				visible: !visible,
				type: this.state.type,
				data,
			},
		});
		if (shouldRefreshData) this.getTemplates();
	};

	templateListUI = () => {
		const { templateList, isLoading, perPage, totalRecords } = this.state;
		const paginationConfig = {
			pageSize: perPage,
			total: totalRecords,
		};

		return (
			<Table
				dataSource={templateList}
				style={{ width: "100%" }}
				loading={isLoading}
				onChange={this.handleTableChange}
				pagination={totalRecords > perPage ? paginationConfig : false}
			>
				<Column
					title="Action"
					key="action"
					dataIndex="action"
					width={250}
					render={(value) => {
						return value
							.replace(/_/g, " ")
							.replace(/\w+/g, function (w) {
								return (
									w[0].toUpperCase() +
									w.slice(1).toLowerCase()
								);
							});
					}}
				/>
				<Column
					title="Subject"
					dataIndex="title"
					key="title"
					render={(value) => {
						return (
							<div
								dangerouslySetInnerHTML={{ __html: value }}
							></div>
						);
					}}
					ellipsis={true}
				/>
				<Column
					title="Action"
					key="action"
					width={200}
					render={(text, record) => (
						<div className="action-button-container">
							<div className="item">
								<Tooltip placement="top" title="Edit">
									<ActionItem
										onClick={() =>
											this.toggleEditModal(record, false)
										}
									>
										Edit
									</ActionItem>
								</Tooltip>
							</div>
						</div>
					)}
				/>
			</Table>
		);
	};

	componentDidUpdate = (prevProps, prevState) => {
		const type = this.state.tempType;
		if (prevState.tempType !== type) {
			this.setState(
				{
					type,
					currentPage: 1,
					templateList: [],
				},
				() => {
					this.getTemplates();
				}
			);
		}
	};
}

export default withRouter(Templates);
