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
import { Wrapper } from "./Interests.style";

let initPaginationInfo = {
	total: 0,
	current: 1,
	sort: {
		field: "name",
		order: "asc",
	},
};

function Interests(props) {
	let [interests, setInterests] = useState([]),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[loading, setLoading] = useState(false),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.VIEW,
			data: {},
		});

	useEffect(() => {
		getInterests();
		// eslint-disable-next-line
	}, []);

	async function getInterests(pagination = paginationInfo) {
		try {
			setLoading(true);
			let response = await new Api().post("interest/list", {
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
			setInterests(response.data.list);

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
			let newList = [...interests];

			newList.forEach((item, index) => {
				if (item.id === data.id) newList[index] = { ...data };
			});
			setInterests(newList);
		} else {
			// IN CASE OF ADD
			getInterests();
		}
	}

	async function onDelete(id) {
		try {
			setLoading(true);
			await new Api().delete("interest/" + id, { returnError: true });
			getInterests();
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

		getInterests(newPaginationInfo);
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
					<PageTitle>Interests</PageTitle>
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
					dataSource={interests}
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

export default Interests;
