import React from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Form } from "antd";

export default function EditPage(props) {
	let [form] = Form.useForm();

	return (
		<SideDrawer
			onConfirm={() => {
				form.submit();
			}}
			{...props}
		>
			<div>
				<h2>Project Details</h2>
				<div className="div-1">
					<b>Project Name:</b>{" "}
					{props.data.name ? props.data.name : ""}
				</div>
				<div>
					<b>Project Overview:</b>{" "}
					{props.data.projectOverview
						? props.data.projectOverview
						: ""}
				</div>
				<div>
					<b>Decision Statement:</b>{" "}
					{props.data.decisionStatement
						? props.data.decisionStatement
						: ""}
				</div>
				<div>
					<b>Start Datetime:</b>{" "}
					{props.data.startDatetime ? props.data.startDatetime : ""}
				</div>
				<div>
					<b>End Datetime:</b>{" "}
					{props.data.endDatetime ? props.data.endDatetime : ""}
				</div>
				<div>
					<b>Is Active:</b>{" "}
					<input type="checkbox" checked={props.data.isActive} />
				</div>
				<div>
					<b>Is Publish:</b>{" "}
					<input type="checkbox" checked={props.data.isPublish} />
				</div>

				<div>
					<b>Total Likes:</b>{" "}
					{props.data.totalLikes ? props.data.totalLikes : 0}
				</div>
				<div>
					<b>Total Views:</b>{" "}
					{props.data.totalViews ? props.data.totalViews : 0}
				</div>
				<div>
					<b>Total Surveys:</b>{" "}
					{props.data.totalSurveys ? props.data.totalSurveys : 0}
				</div>
				<div>
					<b>Total Events:</b>{" "}
					{props.data.totalEvents ? props.data.totalEvents : 0}
				</div>
				<div>
					<b>Total UserFavorites:</b>{" "}
					{props.data.totalUserFavorites
						? props.data.totalUserFavorites
						: 0}
				</div>
				<div>
					<b>Total AuthorityFavorites:</b>{" "}
					{props.data.totalAuthorityFavorites
						? props.data.totalAuthorityFavorites
						: 0}
				</div>
				<div>
					<b>Project Images:</b>{" "}
					{props.data.project_images
						? props.data.project_images.map((data) =>
								data.image ? (
									<img
										key={data.id}
										className="img-fluid"
										src={data.image}
										alt="avatar"
										width="70"
									/>
								) : (
									""
								)
						  )
						: ""}
				</div>

				<hr />
				<h2>Manager Details</h2>
				<div>
					<b>First Name:</b>{" "}
					{props.data.manager_firstName
						? props.data.manager_firstName
						: ""}
				</div>
				<div>
					<b>Last Name:</b>{" "}
					{props.data.manager_lastName
						? props.data.manager_lastName
						: ""}
				</div>
				<div>
					<b>Department:</b>{" "}
					{props.data.manager_department
						? props.data.manager_department
						: ""}
				</div>

				<hr />
				<h2>Creator Details</h2>
				<div>
					<b>Name:</b>{" "}
					{props.data.createdMember
						? props.data.createdMember.firstName
						: ""}
				</div>
				<div>
					<b>Email:</b>{" "}
					{props.data.createdMember
						? props.data.createdMember.email
						: ""}
				</div>
				<div>
					<b>Phone:</b>{" "}
					{props.data.createdMember
						? props.data.createdMember.phone
						: ""}
				</div>
				<div>
					<b>Role Type:</b>{" "}
					{props.data.createdMember
						? props.data.createdMember.roleType
						: ""}
				</div>
				<div>
					<b>Profile Image:</b>{" "}
					<img
						className="img-fluid"
						src={
							props.data.createdMember
								? props.data.createdMember.image
								: ""
						}
						alt="avatar"
						width="70"
					/>
				</div>
				<hr />
				<h2>Interest</h2>
				<div>
					<b>Name:</b>{" "}
					{props.data.interest ? props.data.interest.name : ""}
				</div>
				<hr />
				<h2>Project Phase</h2>
				<div>
					<b>Name:</b>{" "}
					{props.data.project_phase
						? props.data.project_phase.name
						: ""}
				</div>
				<hr />
				<h2>ProjectDocuments</h2>
				<div>
					<b>DocumentName:</b>{" "}
					{/* {props.data.projectDocuments
						? props.data.projectDocuments.name
						: ""} */}
				</div>
			</div>
		</SideDrawer>
	);
}
