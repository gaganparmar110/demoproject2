import React, { useEffect, useState } from "react";

// COMPONENTS
import { Space, Table, Button } from "antd";
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
import { Wrapper } from "./Admin.style";

let initPaginationInfo = {
	total: 0,
	current: 1,
	sort: {
		field: "name",
		order: "asc",
	},
};

function Admins(props) {
	let [admins, setAdmins] = useState([]),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[loading, setLoading] = useState(false),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.VIEW,
			data: {},
		});

	useEffect(() => {
		getAdmins();
		// eslint-disable-next-line
	}, []);

	async function getAdmins(pagination = paginationInfo) {
		try {
			setLoading(true);
			let response = await new Api().post("admin/list", {
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
			setAdmins(response.data.list);

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

		if (type === MODAL_TYPES.EDIT) {
			let newList = [...admins];

			newList.forEach((item, index) => {
				if (item.id === data.id) newList[index] = { ...data };
			});
			setAdmins(newList);
		} else {
			// IN CASE OF ADD
			getAdmins();
		}
	}

	async function onDelete(id) {
		try {
			setLoading(true);
			await new Api().delete("admin/" + id, { returnError: true });
			getAdmins();
		} catch (error) {
			setLoading(false);
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

	function onTableChange(...rest) {
		let newPaginationInfo = setPaginationObject(paginationInfo, ...rest);

		getAdmins(newPaginationInfo);
		setPaginationInfo(newPaginationInfo);
	}

	function Columns() {
		return [
			{
				title: "Name",
				dataIndex: "name",
				key: "name",
				sorter: true,
				...getColumnSearchProps("name"),
				// sorter 		: (a, b) => sortFunction(a, b, 'name')
			},
			{
				title: "Email",
				dataIndex: "email",
				key: "email",
				sorter: true,
				...getColumnSearchProps("email"),
				// sorter 		: (a, b) => sortFunction(a, b, 'name')
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
					<PageTitle>Admins</PageTitle>
					<div className="actions">
						<Button
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
					dataSource={admins}
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

export default Admins;
