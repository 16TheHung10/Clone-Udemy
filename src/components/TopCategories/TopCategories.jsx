import { Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import TopCategoriesWrapper from "./TopCategoriesStyled";

function TopCategories(props) {
  const { data } = props;
  return (
    <TopCategoriesWrapper>
      <div className="top-categories_header">
        <Typography.Title level={5}>Top Categories</Typography.Title>
      </div>
      <Space direction="vertical" size={0}>
        {data.map((category) => (
          <Link
            key={category.id}
            to={`categories/${category.name.toLowerCase()}`}
          >
            <div align="baseline" className="top-categories_item">
              <Typography.Text>
                <div className="top-categories_icon">{category.icon}</div>
                {category.name}
              </Typography.Text>
            </div>
          </Link>
        ))}
      </Space>
    </TopCategoriesWrapper>
  );
}

export default TopCategories;
