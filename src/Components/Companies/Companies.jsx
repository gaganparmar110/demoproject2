import React, { useEffect, useState } from "react";

// COMPONENTS
import { Space, Table, Button } from "antd";
import Drawer from "./Drawer";
import { Card, PageTitle, ActionItem } from "Components/Commons/Commons";

// UTILS
import {
	Api,
	MODAL_TYPES,
	getColumnSearchProps,
	setPaginationObject,
} from "Helpers";

// STYLES
import { Wrapper } from "./Companies.style";

let initPaginationInfo = {
	total: 0,
	current: 1,
	sort: {
		field: "name",
		order: "asc",
	},
};

function Companies(props) {
	let [companies, setCompanies] = useState([]),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[loading, setLoading] = useState(false),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.VIEW,
			data: {},
		});

	useEffect(() => {
		getCompanies();
		// eslint-disable-next-line
	}, []);

	async function getCompanies(pagination = paginationInfo) {
		try {
			setLoading(true);
			let response = await new Api().post("company/list", {
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
			setCompanies(response.data.list);

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
			let newList = [...companies];

			newList.forEach((item, index) => {
				if (item.id === data.id) newList[index] = { ...data };
			});
			setCompanies(newList);
		} else {
			// IN CASE OF ADD
			getCompanies();
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

		getCompanies(newPaginationInfo);
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
			},
			// {
			// 	title: "Address",
			// 	dataIndex: "address",
			// 	key: "address",
			// 	sorter: true,
			// 	...getColumnSearchProps("address"),
			// },
			// {
			// 	title: "Area",
			// 	dataIndex: "area",
			// 	key: "area",
			// 	sorter: true,
			// 	...getColumnSearchProps("area"),
			// },
			{
				title: "City",
				dataIndex: "city",
				key: "city",
				sorter: true,
				...getColumnSearchProps("city"),
			},
			{
				title: "Country",
				dataIndex: "country",
				key: "country",
				sorter: true,
				...getColumnSearchProps("country"),
			},
			// {
			// 	title: "Latitude",
			// 	dataIndex: "latitude",
			// 	key: "latitude",
			// 	sorter: true,
			// 	...getColumnSearchProps("latitude"),
			// },
			// {
			// 	title: "Longitude",
			// 	dataIndex: "longitude",
			// 	key: "longitude",
			// 	sorter: true,
			// 	...getColumnSearchProps("longitude"),
			// },
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
					</Space>
				),
			},
		];
	}

	return (
		<Wrapper>
			<Card spacing={24}>
				<div className="title-wrapper flex">
					<PageTitle>Company</PageTitle>
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
					dataSource={companies}
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

export default Companies;
