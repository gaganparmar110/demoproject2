import React, { useEffect, useState } from "react";

// COMPONENTS
import { Space, Table, Button } from "antd";
import exportFromJSON from 'export-from-json'

import Drawer from "./Drawer";
import {
	Card,
	PageTitle,
	ActionItem,
	DeleteTooltip,
} from "Components/Commons/Commons";

// UTILS
import {
	Api,
	MODAL_TYPES,
	getColumnSearchProps,
	setPaginationObject,
} from "Helpers";

// STYLES
import { Wrapper } from "./Users.style";

let initPaginationInfo = {
	total: 0,
	current: 1,
	sort: {
		field: "name",
		order: "asc",
	},
	showSizeChanger: false,
};

const data = [
	{
		name: "gagan",
		email: "npq6r7mv6a@privaterelay.appleid.com",
		userName: "gagan123",
		phone: 9755667,
		zipCode: 23021
	},
  {
		name: "rutul",
		email: "rutul.appleid.com",
		userName: "rutul123",
		phone: 8755667,
		zipCode: 13021
	},
  {
		name: "Raj",
		email: "raj.appleid.com",
		userName: "raj123",
		phone: 2755667,
		zipCode: 603021
	},
  {
		name: "shanu",
		email: "shanu.appleid.com",
		userName: "shanu123",
		phone: 955667,
		zipCode: 2021
	},
];

function User(props) {
	let [User, setUser] = useState([]),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[loading, setLoading] = useState(false),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.VIEW,
			data: {},
		});

	useEffect(() => {
		getUser();
		// eslint-disable-next-line
	}, []);

	async function getUser(pagination = paginationInfo) {
		try {
			setLoading(true);
			let response = await new Api().post("users/list", {
				data: {
					pageNo: pagination.current,
					sort: pagination.sort,
					search: pagination.search,
				},
				returnUnhandledError: true,
			});
			response.data.list.forEach((element) => {
				element.nameOther = element.name;
			});
			setUser(response.data.list);

			setPaginationInfo({
				...pagination,
				total: response.data.total,
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}

	function onSuccess(type, data) {
		toggleDrawer();
		getUser();
	}

	function onExport (exportType) {
		const fileName = "user_csv_downloaded"
		//   const data = JSON.parse($data.innerText)
		exportFromJSON({ data, fileName, exportType })
	}

	async function onDelete(id) {
		setLoading(true);
		await new Api().delete("users/profile/" + id);
		getUser();
	}

	function toggleDrawer(type, data = {}) {
		setDrawer({
			...drawer,
			type,
			data,
			open: !drawer.open,
		});
	}

	function onTableChange(...rest) {
		let newPaginationInfo = setPaginationObject(paginationInfo, ...rest);

		getUser(newPaginationInfo);
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
				title: "Name",
				dataIndex: "name",
				key: "name",
				sorter: true,
				...getColumnSearchProps("name"),
			},
			{
				title: "Email",
				dataIndex: "email",
				key: "email",
				width: 250,
				...getColumnSearchProps("email"),
			},
			{
				title: "User Name",
				dataIndex: "userName",
				key: "userName",
				width: 250,
				...getColumnSearchProps("userName"),
			},
			{
				title: "Phone",
				dataIndex: "phone",
				key: "phone",
				width: 150,
				...getColumnSearchProps("phone"),
			},
			{
				title: "Zip Code",
				dataIndex: "zipCode",
				key: "zipCode",
				width: 150,
				...getColumnSearchProps("zipCode"),
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
					<PageTitle>User</PageTitle>
				
					<div className="actions">
							<Button
							type="primary"
							onClick={() => {
								onExport('csv');
							}}
						>
							{" "}
							Export{" "}
						</Button>
						<Button
						style={{ marginLeft: "20px" }}
							type="primary"
							onClick={() => {
								toggleDrawer(MODAL_TYPES.ADD);
							}}
							
						>
							{" "}
							Add{" "}
						</Button>
					</div>
				</div>

				<Table
					loading={loading}
					dataSource={User}
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

export default User;
