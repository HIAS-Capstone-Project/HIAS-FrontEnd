import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { useAppDispatch } from 'app/hooks';
import Routes from 'constants/routes';
import { logOut } from 'features/authentication/authenticationSlice';
import { useNavigate } from 'react-router-dom';
import styles from './avatar.module.css';

interface IMenuAvatar {
  key: string;
}

const HeaderAvatar = () => {
  // const info = useAppSelector(selectUserInfo);
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
