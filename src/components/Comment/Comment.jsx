import {
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  HeartOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Space, Typography } from "antd";
import Avatar from "components/Avatar/Avatar";
import MoreDropdown from "components/MoreDropdown/MoreDropdown";
import React from "react";
import styled from "styled-components";

const CommentWrapper = styled.div`
  &&& {
    background-color: #fff;
    padding: 20px;
    padding-left: ${(props) => (props.type ? "80px" : "20px")};
    border-bottom: 1px solid #efefef;
    .comment_header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .comment_user-name {
      margin: 0;
    }
    .comment_content {
      margin-top: 16px;
    }
    .comment_group-action {
      & > .ant-space-item {
        cursor: pointer;
        &:hover {
          color: red;
          .ant-typography {
            color: red;
          }
        }
      }
    }
  }
`;

function Comment(props) {
  const { type, imgLink } = props;
  const moreDropdownSettings = [
    {
      key: 1,
      row: (
        <Space size={16}>
          <EditOutlined />
          <Typography.Text>Edit</Typography.Text>
        </Space>
      ),
    },
    {
      key: 2,
      row: (
        <Space size={16}>
          <DeleteOutlined />
          <Typography.Text>Delete</Typography.Text>
        </Space>
      ),
    },
  ];

  return (
    <CommentWrapper type={type}>
      <div className="comment_header">
        <Space align="start" size={12}>
          <Avatar style={{ width: "52px", height: "52px" }} imgLink={imgLink} />
          <Space direction="vertical" size={0}>
            <Typography.Title className="comment_user-name" level={5}>
              {"John Doe"}
            </Typography.Title>
            <Typography.Text style={{ color: "var(--text-color)" }}>
              {"2 hour ago"}
            </Typography.Text>
          </Space>
        </Space>
        <MoreDropdown menu={moreDropdownSettings} />
      </div>
      <Typography.Paragraph
        className="comment_content"
        style={{ color: "var(--text-color)" }}
      >
        {
          "Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis."
        }
      </Typography.Paragraph>
      <Space align="end" size={20} className="comment_group-action">
        <Space align="baseline">
          <LikeOutlined />
          <Typography.Text>{10}</Typography.Text>
        </Space>
        <Space align="baseline">
          <DislikeOutlined />
          <Typography.Text>{3}</Typography.Text>
        </Space>
        <HeartOutlined />
        <Typography.Text className="comment_reply">Reply</Typography.Text>
      </Space>
    </CommentWrapper>
  );
}

export default Comment;
