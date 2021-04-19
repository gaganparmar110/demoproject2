import React, { useEffect, useState } from "react";

// COMPONENTS
import { Table } from "antd";
// import Drawer from "./Drawer";
import { Card, PageTitle } from "Components/Commons/Commons";

// UTILS
import { Api, setPaginationObject } from "Helpers";

// STYLES
import { Wrapper } from "./Subscription.style";

let initPaginationInfo = {
	total: 0,
	current: 1,
	sort: {
		field: "name",
		order: "asc",
	},
};

function Subscription(props) {
	let [subscription, setSubscription] = useState([]),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[loading, setLoading] = useState(false);

	useEffect(() => {
		getSubscription();
		// eslint-disable-next-line
	}, []);

	async function getSubscription(pagination = paginationInfo) {
		try {
			setLoading(true);
			let response = await new Api().post(
				"subscription/transaction-list",
				{
					data: {
						currentPage: pagination.current,
						perPage: 10,
					},
					returnUnhandledError: true,
					returnError: true,
				}
			);
			response.data.rows.forEach((element) => {
				element.nameOther = element.company_member.firstName;
			});
			setSubscription(response.data.rows);

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

	function onTableChange(...rest) {
		let newPaginationInfo = setPaginationObject(paginationInfo, ...rest);

		getSubscription(newPaginationInfo);
		setPaginationInfo(newPaginationInfo);
	}

	function Columns() {
		return [
			{
				title: "User Name",
				dataIndex: "company_member",
				key: "company_member",
				render: (record, text) => <div>{record.firstName}</div>,
			},
			{
				title: "Email",
				dataIndex: "company_member",
				key: "company_member",
				render: (record, text) => <div>{record.email}</div>,
			},
			{
				title: "Organisation Name",
				dataIndex: "company",
				key: "company",
				render: (record, text) => <div>{record.name}</div>,
			},
			{
				title: "Package Name",
				dataIndex: "company_subscription_plan",
				key: "company_subscription_plan",
				render: (record, text) => <div>{record.name}</div>,
			},
			{
				title: "Price",
				dataIndex: "company_subscription_plan",
				key: "company_subscription_plan",
				render: (record, text) => <div>{record.price}</div>,
			},
			{
				title: "No. of Project",
				dataIndex: "company_subscription_plan",
				key: "company_subscription_plan",
				render: (record, text) => <div>{record.noOfProject}</div>,
			},
			{
				title: "Publish Count",
				dataIndex: "projectPublishCount",
				key: "projectPublishCount",
			},
			{
				title: "Remaining count",
				dataIndex: "company",
				key: "company",
				render: (record, text) => <div>{record.remainingProject}</div>,
			},
			{
				title: "Status",
				dataIndex: "status",
				key: "status",
				render: (record, text) => (
					<div>
						{record === 1
							? "Pending"
							: record === 2
							? "Success"
							: "Decline"}
					</div>
				),
			},
		];
	}

	return (
		<Wrapper>
			<Card spacing={24}>
				<div className="title-wrapper flex">
					<PageTitle>Subscription History </PageTitle>
				</div>

				<Table
					loading={loading}
					dataSource={subscription}
					rowKey={"id"}
					columns={Columns()}
					onChange={onTableChange}
					pagination={paginationInfo}
				/>
			</Card>
		</Wrapper>
	);
}

export default Subscription;
