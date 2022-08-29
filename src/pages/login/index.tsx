import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
// import logo from 'assets/logo.png';
import logo from 'assets/logo.svg';
import Routes from 'constants/routes';
import {
  getInfoUser,
  login,
  removeError,
  selectCurrentUser,
  selectError,
} from 'features/authentication/authenticationSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorageUtil } from 'utils';
import styles from './login.module.css';
import { ILoginParams } from './types';
import { openNotificationWithIcon } from 'components/notification';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const session = LocalStorageUtil.getSessionInfo();
  const user = useAppSelector(selectCurrentUser);
  const error = useAppSelector(selectError);

  const handleLogin = (value: ILoginParams) => {
    dispatch(login(value));
  };

  if (error) {
    openNotificationWithIcon(
      'error',
      'Đăng nhập không thành công',
      'Tài khoản hoặc mật khẩu đăng nhập không chính xác',
      'topRight',
    );
    dispatch(removeError());
  }

  const isAuthenticate = session && !!session.token && user?.isLogined;

  useEffect(() => {
    if (isAuthenticate) {
      dispatch(getInfoUser({ role: user.role, primaryKey: user.primary_key }));
      navigate(Routes.HOME);
    }
  }, [isAuthenticate, navigate]);

  return (
    <div className={styles.wapperLogin}>
      <div className={styles.loginContainer}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <img
            src={logo}
            alt="logo"
            style={{ height: '192px', width: 'auto' }}
          />
        </div>
        <Form onFinish={handleLogin} className="login-form">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Hãy nhập tên đăng nhập' }]}
          >
            <Input
              autoComplete="false"
              size="large"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item className={styles.forgotPassword}>
            Quên mật khẩu?
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
