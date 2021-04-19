import React, { useEffect, useState } from "react";

// COMPONENTS
import { Space, Table } from "antd";
import Drawer from "./Drawer";
import { Card, PageTitle, ActionItem } from "Components/Commons/Commons";

// UTILS
import { Api, MODAL_TYPES } from "Helpers";

// STYLES
import { Wrapper } from "./StaticPages.style";

function StaticPages(props) {
	let [pages, setpages] = useState([]),
		[loading, setLoading] = useState(false),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.GIVE,
			data: {},
		});

	useEffect(() => {
		getpages();
		// eslint-disable-next-line
	}, []);

	async function getpages() {
		try {
			setLoading(true);
			let response = await new Api().get("pages");
			response.data.forEach((element) => {
				element.nameOther = element.title;
			});
			setpages(response.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}

	function onSuccess(type, data) {
		toggleDrawer();

		if (type === MODAL_TYPES.EDIT) {
			let newList = [...pages];

			newList.forEach((item, index) => {
				if (item.id === data.id) newList[index] = { ...data };
			});
			setpages(newList);
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
				title: "Title",
				dataIndex: "title",
				key: "title",
			},
			{
				title: "Type",
				dataIndex: "slug",
				key: "slug",
				render: (slug) => (
					<>{slug.endsWith("authority") ? "Authority" : "App"}</>
				),
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
					<PageTitle>Static Pages</PageTitle>
				</div>

				<Table
					loading={loading}
					dataSource={pages}
					rowKey={"id"}
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
						onSuccess={onSuccess}
					/>
				)}
			</Card>
		</Wrapper>
	);
}

export default StaticPages;
