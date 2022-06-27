import { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import { postMyReport } from "apis/features/Report/ReportApi";

export default function ModalReport({
  typeReport,
  courseId,
  reportedUserId,
  isModalVisible,
  setIsModalVisible,
}) {
  const [form] = Form.useForm();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    const response = await postMyReport({
      type: typeReport,
      courseId,
      reportedUserId,
      description: values.reportContent,
    });

    console.log(response);
    if (response?.data?.isSuccess) {
      message.success("Report successfully");
      form.resetFields();
      setIsModalVisible(false);
    } else {
      message.error("Report fail");
      setIsModalVisible(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={
        typeReport === 0 ? (
          <h2>
            <FlagOutlined style={{ marginRight: 8 }} />
            Report course
          </h2>
        ) : (
          <h2>
            <FlagOutlined style={{ marginRight: 8 }} />
            Report user
          </h2>
        )
      }
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <h4>Write your report:</h4>
      <Form
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="reportContent"
          rules={[
            {
              required: true,
              message: "Please input your report!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button className="btn-red" htmlType="submit" style={{marginRight:8}}>
            Submit
          </Button>
          <Button className="btn-secondary btn-outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
