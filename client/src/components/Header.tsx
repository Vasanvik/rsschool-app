import Link from 'next/link';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import {
  EditOutlined,
  EyeOutlined,
  LogoutOutlined,
  QuestionCircleFilled,
  SaveTwoTone,
  SolutionOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { GithubAvatar } from 'components/GithubAvatar';
import * as React from 'react';
import { SolidarityUkraine } from './SolidarityUkraine';

type Props = {
  username: string;
  courseName?: string;
  title?: string;
  isProfilePage?: boolean;
  isProfileEditingModeEnabled?: boolean;
  isSaveButtonVisible?: boolean;
  onChangeProfilePageMode?: (mode: 'edit' | 'view') => void;
  onSaveClick?: () => void;
};

export function Header(props: Props) {
  const { isProfilePage, onChangeProfilePageMode, isProfileEditingModeEnabled, isSaveButtonVisible } = props;

  const menuActiveItemStyle = { backgroundColor: '#e0f2ff' };
  const menu = (
    <Menu>
      <Menu.Item key="0" style={isProfileEditingModeEnabled ? undefined : menuActiveItemStyle}>
        <Button
          type="link"
          href={isProfilePage ? '#view' : '/profile'}
          onClick={onChangeProfilePageMode ? () => onChangeProfilePageMode('view') : undefined}
          style={{ textAlign: 'left' }}
        >
          <EyeOutlined /> View
        </Button>
      </Menu.Item>
      <Menu.Item key="1" style={isProfileEditingModeEnabled ? menuActiveItemStyle : undefined}>
        <Button
          type="link"
          href={props.isProfilePage ? '#edit' : '/profile#edit'}
          onClick={onChangeProfilePageMode ? () => onChangeProfilePageMode('edit') : undefined}
          style={{ textAlign: 'left' }}
        >
          <EditOutlined /> Edit
        </Button>
      </Menu.Item>
      <Menu.Item key="2" style={isProfileEditingModeEnabled ? menuActiveItemStyle : undefined}>
        <Button type="link" href={'/profile/notifications'} style={{ textAlign: 'left' }}>
          <NotificationOutlined /> Notifications
        </Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button type="link" href={`/cv/edit`} style={{ textAlign: 'left' }}>
          <SolutionOutlined /> My CV
        </Button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">
        <Button type="link" href={'/api/v2/auth/github/logout'} style={{ textAlign: 'left' }}>
          <LogoutOutlined /> Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <nav
        className="no-print"
        style={{ padding: '8px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
      >
        <div className="logo">
          <Link href="/">
            <a>
              <img
                style={{ height: 30 }}
                className="header-logo"
                src="/static/images/logo-rsschool3.png"
                alt="Rolling Scopes School Logo"
              />
            </a>
          </Link>
        </div>
        <div className="title">
          <b>{props.title}</b> {props.courseName}
        </div>
        <div className="profile">
          {isSaveButtonVisible && (
            <Button danger ghost size="large" style={{ marginRight: 16, height: 38 }} onClick={props.onSaveClick}>
              <SaveTwoTone twoToneColor={['#f5222d', '#fff1f0']} />
              <span style={{ marginLeft: 7, fontSize: 14, verticalAlign: 'text-top', color: '#f5222d' }}>Save</span>
            </Button>
          )}
          <Link href="https://docs.app.rs.school">
            <a>
              <Tooltip title="RS School App docs">
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  icon={<QuestionCircleFilled />}
                  style={{ marginRight: 16 }}
                >
                  Help
                </Button>
              </Tooltip>
            </a>
          </Link>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="dashed" size="large">
              <GithubAvatar githubId={props.username} size={24} />
              <span style={{ marginLeft: '12px' }}>My Profile</span>
            </Button>
          </Dropdown>
        </div>
        <style jsx>{`
          .title {
            font-size: 120%;
            align-self: center;
          }
          @media all and (max-width: 540px) {
            .title {
              width: 100%;
              order: 3;
              margin-top: 16px;
            }
          }
        `}</style>
      </nav>
      <SolidarityUkraine />
    </>
  );
}
