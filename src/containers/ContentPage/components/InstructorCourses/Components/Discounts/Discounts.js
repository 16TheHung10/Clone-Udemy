import Wrapper from "./DiscountsStyle";
import clsx from "clsx";
import { Modal, Table, Tooltip, Tag, Image } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteCourse } from "apis/features/Courses/Courses";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCoursesById } from "redux/features/courses/coursesSelector";
import { selectMyCreatedCourses } from "redux/features/courses/coursesSelector";

function Discounts() {
  const myCreatedCourses = useSelector(selectMyCreatedCourses);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  // Handle date time
  const convertDateTime = (data) => {
    const myStringDate = `${new Date(data)}`;
    return myStringDate.slice(0, myStringDate.search("GMT"));
  };
  // handle model
  const handleOk = () => {
    setIsModalVisible(false);
    deleteCourse(idDelete);
  };

  const handleCancel = () => {
    setIdDelete("");
    setIsModalVisible(false);
  };
  // Handle delete
  const handleDelete = (idCourse) => {
    setIsModalVisible(true);
    setIdDelete(idCourse);
  };

  const columns = [
    {
      title: (
        <div className="headerTable text-center">
          <span>Item No</span>
        </div>
      ),
      dataIndex: "itemNo",
      key: "itemNo",
      width: "7%",
      render: (text) => (
        <div className=" text-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "thumbnailCourse",
      key: "thumbnailCourse",
      width: "5%",
      render: (text) => <Image width={64} src={text} />,
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Title</span>
        </div>
      ),
      dataIndex: "title",
      key: "title",
      width: "15%",
      render: (text, record) => (
        <Tooltip placement="topLeft" title={text}>
          <Link to={`/courses/${record.key}`}>
            <span className="long-content">{text}</span>
          </Link>
        </Tooltip>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Publish Date</span>
        </div>
      ),
      dataIndex: "publishDate",
      key: "publishDate",
      width: "8%",
      render: (text) => (
        <div className="text-center">
          <span className="long-content">{convertDateTime(text)}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Before discounts</span>
        </div>
      ),
      dataIndex: "sales",
      key: "sales",
      width: "5%",
      render: (text, record) => (
        <div className="text-center">
          <span>{`${text}$`}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Discounts</span>
        </div>
      ),
      dataIndex: "discounts",
      key: "discounts",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span style={{ color: "red", fontWeight: "600" }}>{`${text}$`}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>After discounts</span>
        </div>
      ),
      dataIndex: "sales",
      key: "sales",
      width: "5%",
      render: (text, record) => (
        <div className="text-center">
          <span>{`${text - record.discounts}$`}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Parts</span>
        </div>
      ),
      dataIndex: "parts",
      key: "parts",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Category</span>
        </div>
      ),
      dataIndex: "category",
      key: "category",
      width: "10%",
      render: (text) => (
        <div className="text-center">
          <Tooltip placement="topLeft" title={text}>
            <span className="long-content">{text}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Status</span>
        </div>
      ),
      dataIndex: "status",
      key: "status",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          {text === "Active" && <Tag color="#87d068">{text}</Tag>}
          {text === "Inactive" && <Tag color="#f50">{text}</Tag>}
        </div>
      ),
    }
  ];

  const data = myCreatedCourses
    ?.filter((item) => item.salePrice)
    ?.map((courseItem, index) => {
      return {
        key: courseItem?.id,
        itemNo: index + 1,
        title: courseItem?.title,
        discounts: courseItem.salePrice,
        thumbnailCourse: courseItem.imageUrl,
        publishDate: courseItem?.createdAt,
        sales: courseItem?.price,
        parts: courseItem?.sections.length,
        category: courseItem?.categories.map((item) => item?.name).join(", "),
        status: courseItem?.isActive ? "Active" : "Inactive",
      };
    });
  return (
    <Wrapper>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1000,
        }}
      />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure to delete?</p>
      </Modal>
    </Wrapper>
  );
}

export default Discounts;
