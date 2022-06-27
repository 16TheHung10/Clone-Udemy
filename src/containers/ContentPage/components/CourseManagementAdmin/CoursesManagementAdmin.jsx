import { Button, Space, Table, Typography, Switch, Popconfirm } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import * as courseSelector from "redux/features/courses/coursesSelector";

import styled from "styled-components";

const CourseManagementAdminWrapper = styled.div`
  &&& {
    padding: 30px;
    .table_categories {
      &:not(:first-child) {
        margin-left: 8px;
        padding-left: 8px;
        border-left: 1px solid black;
      }
    }
  }
`;

function CourseManagementAdmin(props) {
  const courseData = useSelector(courseSelector.selectCourses);

  const [visible, setVisible] = useState(false);

  const hideSwitchHandler = () => {
    setVisible(false);
  };

  const switchActiveHandler = (id) => {};

  const columns = [
    {
      title: "",
      dataIndex: "imageUrl",
      key: "imageUrl",
      align: "center",
      render: (text, record) => (
        <img
          style={{ width: "92px", height: "72px" }}
          alt=""
          src={record.imageUrl}
        />
      ),
    },
    {
      align: "center",
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      align: "center",
      title: "Author",
      dataIndex: "",
      key: "author",
      render: (_, record) => record.user.fullName,
    },
    {
      align: "center",
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => (text === 0 ? 0 : `$${text}`),
    },
    {
      align: "center",
      title: "Category",
      dataIndex: "",
      key: "categories",
      render: (_, record) =>
        record.categories.map((category, index) => (
          <span className="table_categories" key={index}>
            {category.name}
          </span>
        )),
    },
    {
      title: "Active",
      dataIndex: "",
      key: "toggleActive",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          onConfirm={() => switchActiveHandler(record.id)}
          onCancel={() => console.log("cancel")}
          title={`Are you sure you want to ${
            false ? "deactivate" : "activate"
          } this account`}
          content={
            <Space
              style={{ width: "100%", justifyContent: "center" }}
              size={32}
            >
              <Button onClick={hideSwitchHandler}>Cancel</Button>
              <Button type="primary" danger onClick={hideSwitchHandler}>
                Accept
              </Button>
            </Space>
          }
          trigger="click"
        >
          <Switch
            onClick={() => console.log(true)}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={record.isActive}
            checked={record.isActive}
          />
        </Popconfirm>
      ),
    },
    {
      align: "center",
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <Space>
          <Button type="primary">View Detail</Button>
        </Space>
      ),
    },
  ];

  return (
    <CourseManagementAdminWrapper>
      <Typography.Title>Course Management</Typography.Title>
      <Table rowKey="id" columns={columns} dataSource={courseData}></Table>
    </CourseManagementAdminWrapper>
  );
}

export default CourseManagementAdmin;
