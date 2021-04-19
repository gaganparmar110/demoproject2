import React from "react";
import LazyLoader from "@loadable/component";

import {
	URL_DASHBOARD,
	URL_USER,
	URL_PLANING_AUTHORITY,
	URL_PAGES,
	URL_INTERESTS,
	URL_Project_Phases,
	URL_COMPANIES,
	URL_ADMIN,
	URL_COMPANY_MEMBER,
	URL_PROJECTS,
	URL_TEMPLEATES,
	URL_SUBSCRIPTION_HISTORY,
	URL_CHANGE_PASSWORD
} from "Helpers/Paths";

import {
	ShopOutlined,
	BarChartOutlined,
	CloudOutlined,
	UserOutlined,
	TeamOutlined,
} from "@ant-design/icons";

export default [
	{
		path: "/",
		exact: true,
		component: LazyLoader(() => import("Components/Dashboard/Dashboard")),
	},
	{
		path: URL_DASHBOARD,
		exact: true,
		component: LazyLoader(() => import("Components/Dashboard/Dashboard")),
		sidebar: {
			name: "Dashboard",
			icon: <BarChartOutlined />,
		},
	},
	{
		path: URL_ADMIN,
		exact: true,
		component: LazyLoader(() => import("Components/Admins/Admins")),
		sidebar: {
			name: "Admins",
			icon: <UserOutlined />,
		},
	},
	{
		path: URL_TEMPLEATES,
		exact: true,
		component: LazyLoader(() => import("Components/Templates/index")),
		sidebar: {
			name: "Templates",
			icon: <UserOutlined />,
		},
	},
	{
		path: URL_USER,
		exact: true,
		component: LazyLoader(() => import("Components/Users/Users")),
		sidebar: {
			name: "Users",
			icon: <UserOutlined />,
		},
	},
	{
		path: URL_PLANING_AUTHORITY,
		exact: true,
		component: LazyLoader(() =>
			import("Components/PlanningAuthorities/PlanningAuthorities")
		),
		sidebar: {
			name: "Planning Authorities",
			icon: <TeamOutlined />,
			nested: [
				{
					name: "Company",
					path: URL_COMPANIES,
					component: LazyLoader(() =>
						import("Components/Companies/Companies")
					),
				},
				{
					name: "Company Member",
					path: URL_COMPANY_MEMBER,
					component: LazyLoader(() =>
						import("Components/CompanyMember/CompanyMember")
					),
				},
				{
					name: "Projects",
					path: URL_PROJECTS,
					component: LazyLoader(() =>
						import("Components/Projects/Projects")
					),
				},
			],
		},
		//     sidebar     : {
		//         name    : "Settings",
		//         icon    :  <AppstoreOutlined/>,
		//         nested : [
		//             {
		//                 name    : "App",
		//                 path    : URL_SETTINGS_APP,
		//                 component: LazyLoader(() => import('Components/Users/Users')),
		//             }
		//         ]
		//     }
	},
	// {
	// 	path: URL_CITY,
	// 	exact: true,
	// 	component: LazyLoader(() => import("Components/City/City")),
	// 	sidebar: {
	// 		name: "City",
	// 		icon: <ShopOutlined />,
	// 	},
	// },
	{
		path: URL_INTERESTS,
		exact: true,
		component: LazyLoader(() => import("Components/Interests/Interests")),
		sidebar: {
			name: "Interests",
			icon: <ShopOutlined />,
		},
	},
	{
		path: URL_Project_Phases,
		exact: true,
		component: LazyLoader(() =>
			import("Components/ProjectPhases/ProjectPhases")
		),
		sidebar: {
			name: "ProjectPhases",
			icon: <ShopOutlined />,
		},
	},
	{
		path: URL_SUBSCRIPTION_HISTORY,
		exact: true,
		component: LazyLoader(() =>
			import("Components/Subscription/Subscription")
		),
		sidebar: {
			name: "Subscription History",
			icon: <ShopOutlined />,
		},
	},
	{
		path: URL_PAGES,
		exact: true,
		component: LazyLoader(() =>
			import("Components/StaticPages/StaticPages")
		),
		sidebar: {
			name: "Pages",
			icon: <CloudOutlined />,
			showDivider: true,
		},
	},
	{
		path: URL_CHANGE_PASSWORD,
		exact: true,
		component: LazyLoader(() => import("Components/ChangePassword/ChangePassword")),
		sidebar: {
			name: "Change Password",
			icon: <UserOutlined />,
		},
	},
	// {
	// 	path: URL_SETTINGS,
	// 	exact: true,
	// 	component: LazyLoader(() => import("Components/Dashboard/Dashboard")),
	// 	sidebar: {
	// 		name: "Settings",
	// 		icon: <AppstoreOutlined />,
	// 		nested: [
	// 			{
	// 				name: "App",
	// 				path: URL_SETTINGS_APP,
	// 				component: LazyLoader(() =>
	// 					import("Components/Users/Users")
	// 				),
	// 			},
	// 		],
	// 	},
	// },
];
