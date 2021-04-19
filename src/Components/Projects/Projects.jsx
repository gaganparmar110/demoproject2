import React, { useEffect, useState } from "react";

// COMPONENTS
import { Space, Table, Select } from "antd";
import Drawer from "./Drawer";
import { Card, PageTitle, ActionItem } from "Components/Commons/Commons";

// UTILS
import { Api, MODAL_TYPES, setPaginationObject } from "Helpers";

// STYLES
import { Wrapper } from "./Projects.style";

const { Option } = Select;
let initPaginationInfo = {
	total: 0,
	current: 1,
	sort: {
		field: "name",
		order: "asc",
	},
};
function Projects(props) {
	let [projects, setProjects] = useState([]),
		[loading, setLoading] = useState(false),
		[companies, setCompanies] = useState([]),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[companyId, setCompanyId] = useState(),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.GIVE,
			data: {},
		});

	useEffect(() => {
		getCompanies();
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (companyId) getProjects();
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
	function companyFilterHandle(value) {
		setCompanyId(value);
	}
	function onComapnySearch(val) {
		getCompanies(val);
	}
	function onTableChange(...rest) {
		let newPaginationInfo = setPaginationObject(paginationInfo, ...rest);

		getProjects(newPaginationInfo);
		setPaginationInfo(newPaginationInfo);
	}
	async function getProjects(pagination = paginationInfo) {
		try {
			setLoading(true);
			let config = {
				data: {
					companyId: companyId,
					perPage: 10,
					currentPage: pagination.current,
				},
				returnUnhandledError: true,
				returnError: true,
			};
			let response = await new Api().post("project/list", config);
			response.data.rows.forEach((element) => {
				element.nameOther = element.name;
			});
			setProjects(response.data.rows);
			setPaginationInfo({
				...pagination,
				total: response.data.count,
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log("error:", error);
		}
	}
	function toggleDrawer(type, data = {}) {
		setDrawer({
			...drawer,
			type,
			data,
			open: !drawer.open,
		});
	}
	function Columns() {
		return [
			{
				title: "Project Name",
				dataIndex: "name",
				key: "name",
				width: 150,
			},
			{
				title: "Project Creator",
				dataIndex: "createdMember",
				key: "createdMember",
				width: 150,
				render: (createdMember) => createdMember.firstName,
			},
			{
				title: "Total Likes",
				dataIndex: "totalLikes",
				key: "totalLikes",
				width: 100,
			},
			{
				title: "Total Views",
				dataIndex: "totalViews",
				key: "totalViews",
				width: 100,
			},
			{
				title: "Total Surveys",
				dataIndex: "totalSurveys",
				key: "totalSurveys",
				width: 100,
			},
			{
				title: "Total Events",
				dataIndex: "totalEvents",
				key: "totalEvents",
				width: 100,
			},
			{
				title: "Total User Favorites",
				dataIndex: "totalUserFavorites",
				key: "totalUserFavorites",
				width: 100,
			},
			{
				title: "Total Authority Favorites",
				dataIndex: "totalAuthorityFavorites",
				key: "totalAuthorityFavorites",
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
								toggleDrawer(MODAL_TYPES.VIEW, record);
							}}
						>
							View
						</ActionItem>
					</Space>
				),
			},
		];
	}

	return (
		<Wrapper>
			<Card spacing={24}>
				<div className="title-wrapper flex">
					<PageTitle>Projects</PageTitle>
					<div className="actions">
						<Select
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
					</div>
				</div>

				<Table
					loading={loading}
					dataSource={projects}
					rowKey={"id"}
					onChange={onTableChange}
					pagination={paginationInfo}
					columns={Columns()}
				/>
				{drawer.open && (
					<Drawer
						visible
						type={drawer.type}
						data={drawer.data}
						title={
							MODAL_TYPES.VIEW === drawer.type ? "View" : "Edit"
						}
						submitText={
							MODAL_TYPES.VIEW === drawer.type ? "View" : "Update"
						} // OPTIONAL
						onClose={toggleDrawer}
					/>
				)}
			</Card>
		</Wrapper>
	);
}

export default Projects;
