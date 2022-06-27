import { BellOutlined, MailOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import NotificationWrapper from './NotificationStyled';

const NotiList = (props) => {
  return (
    <NotificationWrapper>
      {props.fewNoti.map((noti) => {
        return (
          <div className='noti-dropdown' key={props.fewNoti.indexOf(noti)}>
            <div className='img-column'>
              <Avatar size={50} src={noti.imgUrl} />
            </div>
            <div className='content-column'>
              <p>{noti.name}</p>
              <span>{`${noti.action ? noti.action : ''} `}</span>{' '}
              <span className={`${noti.action ? 'noti-content-bold' : ''}`}>{noti.content}</span>
              <span className='noti-time'>{noti.time}</span>
            </div>
          </div>
        );
      })}
      <Link to={`${props.viewAllLink}`}>
        <Button type='danger' className='btn-view-all'>
          View all <RightOutlined />
        </Button>
      </Link>
    </NotificationWrapper>
  );
};

const NotificationList = (props) => {
  let fewNoti = props.notifications ? [...props.notifications.slice(0, 3)] : [];
  // let viewAllLink = props.viewAllLink ? props.viewAllLink : '#';
  let viewAllLink='/notifications'

  return (
    <Dropdown
      overlay={<NotiList fewNoti={fewNoti} viewAllLink={viewAllLink} />}
      trigger={['click']}
      placement='bottomLeft'
    >
      <Badge count={props.notifications ? props.notifications.length : 0}>
        {props.type === 'mail-notifications' ? (
          <MailOutlined className='notification' />
        ) : (
          <BellOutlined className='notification' />
        )}
      </Badge>
    </Dropdown>
  );
};

export default NotificationList;
