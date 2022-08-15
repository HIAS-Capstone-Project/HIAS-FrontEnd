import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  logOut,
  selectCurrentUser,
} from 'features/authentication/authenticationSlice';
import styles from './avatar.module.css';
import Routes from 'constants/routes';
import { useNavigate } from 'react-router-dom';

interface IMenuAvatar {
  key: string;
}

const HeaderAvatar = () => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClick = ({ key }: IMenuAvatar) => {
    switch (key) {
      case 'logout':
        dispatch(logOut());
        navigate(Routes.LOGIN);
        break;
      default:
        break;
    }
  };

  const items = [
    {
      label: (
        <>
          <LogoutOutlined style={{ marginRight: '20px' }} />
          Đăng xuất
        </>
      ),
      key: 'logout',
    },
  ];

  const menu = <Menu items={items} onClick={onClick}></Menu>;

  return (
    <div className={styles.dropdownWrap}>
      <Dropdown overlay={menu}>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};

export default HeaderAvatar;
