import React, { useEffect, useState } from "react";
// ANT design
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
import { Table, Modal, message, Tooltip, Image, Tag, Button } from "antd";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  getAllCreatedCourses,
  putCreatedCourse,
} from "apis/features/Courses/Courses";
import { Link } from "react-router-dom";
// style component
import Wrapper from "./PendingCoursesStyled";

function PendingCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const [createCourses, setCreatedCourses] = useState([]);
  // Handle date time
  const convertDateTime = (data) => {
    const myStringDate = `${new Date(data)}`;

    return myStringDate.slice(0, myStringDate.search("GMT"));
  };
  const getDataCreatedCourses = async () => {
    setIsLoading(true);
    const response = await getAllCreatedCourses();
    setCreatedCourses(response?.data?.data?.result);
    setIsLoading(false);
  };

  useEffect(() => {
    getDataCreatedCourses();
  }, []);

  // table
  const columns = [
    {
      title: (
        <div className="text-center">
          <span>No</span>
        </div>
      ),
      dataIndex: "itemNo",
      key: "itemNo",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
      // render: (text) => <a>{text}</a>,
    },
    {
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <Image width={64} height={64} src={text} />
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Course title</span>
        </div>
      ),
      dataIndex: "courseTitle",
      key: "courseTitle",
      width: "10%",
      render: (text, record) => (
        <Link to={`/courses/${record.key}`}>
          <div className="text-center">
            <p className="long-content ">{text}</p>
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Category</span>
        </div>
      ),
      dataIndex: "category",
      key: "category",
      width: "10%",
      render: (text) => (
        <div className="text-center">
          <span className="long-content">{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Author</span>
        </div>
      ),
      dataIndex: "author",
      key: "author",
      width: "10%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Course status</span>
        </div>
      ),
      dataIndex: "courseStatus",
      key: "courseStatus",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          {text === 0 && <Tag color="#108ee9">Pending</Tag>}
          {text === 1 && <Tag color="#87d068">Approved</Tag>}
          {text === 2 && <Tag color="#f50">Reject</Tag>}
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
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
        <div className="text-center">
          <span>Action</span>
        </div>
      ),
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <div className="actionContent text-center">
          {/* <a>Invite {record.key}</a> */}
          <div>
            <Tooltip title="Approve course">
              <CheckOutlined
                onClick={(e) => {
                  setIsModalVisible(true);
                  setTypeModal("approve");
                  setDataReport({
                    courseId: record.key,
                    status: 1,
                  });
                }}
                className="iconAction"
              />
            </Tooltip>

            <Tooltip title="Reject course">
              <CloseOutlined
                onClick={(e) => {
                  setIsModalVisible(true);
                  setTypeModal("reject");
                  setDataReport({
                    courseId: record.key,
                    status: 2,
                  });
                }}
                className="iconAction"
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  const data = createCourses?.map((item, index) => {
    return {
      key: item?.id,
      itemNo: index + 1,
      thumbnail: item?.imageUrl,
      courseTitle: item?.title,
      author: item?.user?.fullName,
      courseStatus: item?.status,
      publishDate: item?.createdAt,
      category: item?.categories.map((item) => item?.name).join(", "),
    };
  });

  // handle modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [dataReport, setDataReport] = useState({
    courseId: "",
    status: "",
  });

  const handleOk = async () => {
    let response;
    switch (typeModal) {
      case "reject":
        response = await putCreatedCourse(dataReport);
        if (response?.data?.isSuccess) {
          message.success("Reject successfully");
          getDataCreatedCourses();
          setIsModalVisible(false);
        } else {
          message.error("Reject fail");
          setIsModalVisible(false);
        }
        break;
      case "approve":
        response = await putCreatedCourse(dataReport);
        if (response?.data?.isSuccess) {
          message.success("approve successfully");
          getDataCreatedCourses();
          setIsModalVisible(false);
        } else {
          message.error("approve fail");
          setIsModalVisible(false);
        }
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // ---End handle modal---

  return (
    <Wrapper>
      {/* Area 2 */}
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          scroll={{
            x: 1000,
          }}
        />
      {/* Modal */}
      <Modal
        title="Confirm action"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button className="btn-secondary btn-outlined" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button className="btn-red" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {typeModal === "approve" && <p>Are you sure to approve this course?</p>}
        {typeModal === "reject" && <p>Are you sure to reject this course?</p>}
      </Modal>
    </Wrapper>
  );
}

export default PendingCourses;
