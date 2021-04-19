import React, { useState } from "react";

// COMPONENTS
import { Space, Table, Input } from "antd";
import Drawer from "./Drawer";
import {
  Card,
  PageTitle,
  ActionItem,
  DeleteTooltip,
} from "Components/Commons/Commons";

// UTILS
import { MODAL_TYPES } from "Helpers";

// STYLES
import { Wrapper } from "./PlanningAuthorities.style";

// IMAGES
import Avatar from "Assets/Images/avatar.png";
const Search = Input.Search;

function PlanningAuthority(props) {
  let [drawer, setDrawer] = useState({
    open: false,
    type: MODAL_TYPES.VIEW,
    data: {},
  });

  let profile_pic = {
    title: "Profile picture",
    key: "profile_pic",
    fixed: "left",
    width: 100,
    render: (text, record) => (
      <img className="img-fluid" src={Avatar} alt="avatar" width="70" />
    ),
  };

  let actionColumn = {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 100,
    render: (text, record) => (
      <Space size="middle">
        <ActionItem
          onClick={() => {
            toggleDrawer(MODAL_TYPES.EDIT);
          }}
        >
          Edit
        </ActionItem>
        <DeleteTooltip onConfirm={onConfirm}>Delete</DeleteTooltip>
      </Space>
    ),
  };

  let tableColumns = [profile_pic, ...columns, actionColumn];

  function callback() {
    console.log("search result");
  }

  function onConfirm() {
    console.log("Item Deleted");
  }

  function toggleDrawer(type) {
    setDrawer({
      ...drawer,
      type,
      open: !drawer.open,
    });
  }

  return (
    <Wrapper>
      <Card spacing={24}>
        <div className="title-wrapper flex">
          <PageTitle>Planing Authorities</PageTitle>
          <div className="search">
            <Search placeholder="Search Planning Authority" onChange={callback} allowClear />
          </div>
          <div className="actions">
            {/* <Button type="primary" onClick={() => {toggleDrawer(MODAL_TYPES.ADD)}}> Add </Button> */}
          </div>
        </div>

        <Table
          dataSource={dataSource}
          columns={tableColumns}
          scroll={{ x: 1500 }}
        />

        <Drawer
          visible={drawer.open}
          title={(MODAL_TYPES.ADD === drawer.type ? "Add" : "Edit") + " planning authority"}
          submitText={MODAL_TYPES.ADD === drawer.type ? "Add" : "Update"} // OPTIONAL
          onClose={toggleDrawer}
          onConfirm={toggleDrawer}
        />
      </Card>
    </Wrapper>
  );
}

export default PlanningAuthority;

const dataSource = [];
for (let i = 0; i < 50; i++) {
  dataSource.push({
    key: i,
    name: `Edrward ${i}`,
    email: `lorem${i}@ipsum.com`,
    phone: `+91${i}`,
    address: `London Park no. ${i}, United States `,
    subscription_plan: `Monthly`,
  });
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 250,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 250,
  },
  {
    title: "Subscription plan",
    dataIndex: "subscription_plan",
    key: "subscription_plan",
    width: 250,
  },
];
