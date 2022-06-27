import Wrapper from "./NotificationPageStyled";
import React from "react";
import { Input, Space, Tabs, Row, Col } from "antd";
import Comment from 'components/Comment/Comment'
import {
  BellOutlined,
  
} from "@ant-design/icons";

import { ReactComponent as EditIcon } from "assets/svg/edit-page.svg";

export default function NotificationPage() {
  
  return (
    <Wrapper>
      <div className="title-noti">
        <h2> <BellOutlined style={{fontSize:20}}/> Notifications</h2>
      </div>
      <button className="btn-red button-setting">Notification Setting</button>
      <div className="noti-area">
        <Comment 
          linkAvata='https://gambolthemes.net/html-items/cursus_main_demo/images/left-imgs/img-1.jpg'
          name='Rock William'
          content='Like Your Comment On Video How to create sidebar menu.'
          time='2 min ago'
        />
        <Comment 
          linkAvata='https://gambolthemes.net/html-items/cursus_main_demo/images/left-imgs/img-2.jpg'
          name='Jassica Smith'
          content='Added New Review In Video Full Stack PHP Developer.'
          time='12 min ago'
        />
        <Comment 
          linkAvata='https://gambolthemes.net/html-items/cursus_main_demo/images/left-imgs/img-2.jpg'
          name='Jassica Smith'
          content='Added New Review In Video Full Stack PHP Developer.'
          time='12 min ago'
        />
        <Comment 
          linkAvata='https://gambolthemes.net/html-items/cursus_main_demo/images/left-imgs/img-2.jpg'
          name='Jassica Smith'
          content='Added New Review In Video Full Stack PHP Developer.'
          time='12 min ago'
        />
        <Comment 
          linkAvata='https://gambolthemes.net/html-items/cursus_main_demo/images/left-imgs/img-2.jpg'
          name='Jassica Smith'
          content='Added New Review In Video Full Stack PHP Developer.'
          time='12 min ago'
        />
      </div>
    </Wrapper>
  );
}
