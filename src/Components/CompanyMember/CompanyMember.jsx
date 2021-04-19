import React, { useEffect, useState } from "react";

// COMPONENTS
import { Space, Table, Button, Select } from "antd";
import Drawer from "./Drawer";
import {
	Card,
	PageTitle,
	ActionItem,
	DeleteTooltip,
} from "Components/Commons/Commons";

// UTILS
import { Api, MODAL_TYPES, setPaginationObject } from "Helpers";

// STYLES
import { Wrapper } from "./CompanyMember.style";

const { Option } = Select;
let initPaginationInfo = {
	total: 0,
	current: 1,
	sort: {
		field: "name",
		order: "asc",
	},
};

function CompanyMember(props) {
	let [companyMember, setCompanyMember] = useState([]),
		[companies, setCompanies] = useState([]),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[loading, setLoading] = useState(false),
		[companyId, setCompanyId] = useState(),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.VIEW,
			data: {},
		});

	useEffect(() => {
		getCompanies();
		getCompanyMember();
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (companyId) getCompanyMember();
		// eslint-disable-next-line
	}, [companyId]);

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

	async function getCompanyMember(pagination = paginationInfo) {
		try {
			setLoading(true);
			let response = await new Api().post(
				`member/list/${companyId ? companyId : ""}`,
				{
					data: {
						perPage: 10,
						currentPage: pagination.current,
					},
					returnUnhandledError: true,
					retrunError: true,
				}
			);
			response.data.rows.forEach((element) => {
				element.nameOther = element.name;
			});
			setCompanyMember(response.data.rows);

			setPaginationInfo({
				...pagination,
				total: response.data.count,
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}

	function onSuccess(type, data) {
		toggleDrawer();
		getCompanyMember();
	}

	function toggleDrawer(type, data = {}) {
		setDrawer({
			...drawer,
			type,
			data,
			open: !drawer.open,
		});
	}
	function companyFilterHandle(value) {
		setCompanyId(value);
	}
	function onComapnySearch(val) {
		getCompanies(val);
	}
	async function onDelete(deleteId) {
		try {
			setLoading(true);
			const config = {
				data: {
					id: deleteId,
				},
				returnError: true,
			};
			await new Api().delete("member/", config);
			getCompanyMember();
		} catch (error) {
			setLoading(false);
			console.log("Error:", error);
		}
	}

	function onTableChange(...rest) {
		let newPaginationInfo = setPaginationObject(paginationInfo, ...rest);

		getCompanyMember(newPaginationInfo);
		setPaginationInfo(newPaginationInfo);
	}

	function Columns() {
		return [
			{
				title: "Profile Image",
				dataIndex: "image",
				key: "image",
				fixed: "left",
				width: 100,
				render: (text, record) => (
					<img
						className="img-fluid"
						src={
							record.image
								? record.image
								: ""
						}
						alt="avatar"
						width="70"
					/>
				),
			},
			{
				title: "FirstName",
				dataIndex: "firstName",
				key: "firstName",
				width: 100,
			},
			{
				title: "LastName",
				dataIndex: "lastName",
				key: "lastName",
				width: 100,
			},
			{
				title: "Email",
				dataIndex: "email",
				key: "email",
				width: 100,
			},
			{
				title: "Phone",
				dataIndex: "phone",
				key: "phone",
				width: 100,
			},
			{
				title: "Role Type",
				dataIndex: "roleType",
				key: "roleType",
				width: 100,
			},
			{
				title: "Action",
				key: "action",
				fixed: "right",
				width: 100,
				render: (text, record) => (
					<Space size="middle">
						<ActionItem
							onClick={() => {
								toggleDrawer(MODAL_TYPES.EDIT, record);
							}}
						>
							Edit
						</ActionItem>
						<DeleteTooltip onConfirm={() => onDelete(record.id)}>
							Delete
						</DeleteTooltip>
					</Space>
				),
			},
		];
	}

	return (
		<Wrapper>
			<Card spacing={24}>
				<div className="title-wrapper flex">
					<PageTitle>Company Member</PageTitle>
					<div className="actions">
						<Select
							className="mr-1"
							showSearch
							autoFocus
							style={{ width: 200 }}
							placeholder="Select a Company"
							optionFilterProp="children"
							onChange={companyFilterHandle}
							onSearch={onComapnySearch}
							loading={loading}
						>
							{companies.map((item, index) => (
								<Option value={item.id} key={index}>
									{item.name}
								</Option>
							))}
						</Select>
						<Button
							style={{ marginLeft: "20px" }}
							className="ml-1"
							type="primary"
							onClick={() => {
								toggleDrawer(MODAL_TYPES.ADD, companies);
							}}
						>
							{" "}
							Add{" "}
						</Button>
					</div>
				</div>

				<Table
					loading={loading}
					dataSource={companyMember}
					rowKey={"id"}
					columns={Columns()}
					onChange={onTableChange}
					pagination={paginationInfo}
				/>

				{drawer.open && (
					<Drawer
						visible
						type={drawer.type}
						data={drawer.data}
						title={MODAL_TYPES.ADD === drawer.type ? "Add" : "Edit"}
						submitText={
							MODAL_TYPES.ADD === drawer.type ? "Add" : "Update"
						} // OPTIONAL
						onClose={toggleDrawer}
						onSuccess={onSuccess}
					/>
				)}
			</Card>
		</Wrapper>
	);
}

export default CompanyMember;
