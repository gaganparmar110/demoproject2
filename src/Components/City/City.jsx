import React, { useState } from "react";

// COMPONENTS
import { Space, Table, Input, Button } from "antd";
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
import { Wrapper } from "./City.style";

const Search = Input.Search;

function City(props) {
  let [drawer, setDrawer] = useState({
    open: false,
    type: MODAL_TYPES.VIEW,
    data: {},
  });

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

  let tableColumns = [...columns, actionColumn];

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
          <PageTitle>City</PageTitle>
          <div className="search">
            <Search placeholder="Search City" onChange={callback} allowClear />
          </div>
          <div className="actions">
            <Button type="primary" onClick={() => {toggleDrawer(MODAL_TYPES.ADD)}}> Add </Button>
          </div>
        </div>

        <Table
          dataSource={dataSource}
          columns={tableColumns}
          scroll={{ x: 1500 }}
        />

        <Drawer
          visible={drawer.open}
          title={(MODAL_TYPES.ADD === drawer.type ? "Add" : "Edit") + " city"}
          submitText={MODAL_TYPES.ADD === drawer.type ? "Add" : "Update"} // OPTIONAL
          onClose={toggleDrawer}
          onConfirm={toggleDrawer}
        />
      </Card>
    </Wrapper>
  );
}

export default City;

const dataSource = [];
for (let i = 0; i < 50; i++) {
  dataSource.push({
    key: i,
    city_name: `Ahmedabad ${i}`,
    city_code: `AH${i}`,
  });
}

const columns = [
  {
    title: "City Name",
    dataIndex: "city_name",
    key: "city_name",
    fixed: "left",
    width: 150,
  },
  {
    title: "City Code",
    dataIndex: "city_code",
    key: "city_code",
    width: 150,
  },
];
