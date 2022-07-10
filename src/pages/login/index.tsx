import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Routes from 'constants/routes';
import {
  login,
  selectCurrentUser,
} from 'features/authentication/authenticationSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorageUtil } from 'utils';
import styles from './login.module.css';
import { ILoginParams } from './types';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const session = LocalStorageUtil.getSessionInfo();
  const user = useAppSelector(selectCurrentUser);

  const handleLogin = (value: ILoginParams) => {
    dispatch(login(value));
  };

  const isAuthenticate = session && !!session.token && user?.isLogined;

  useEffect(() => {
    if (isAuthenticate) {
      navigate(Routes.HOME);
    }
  }, [isAuthenticate, navigate]);

  return (
    <div className={styles.wapperLogin}>
      <div className={styles.loginContainer}>
        <Form onFinish={handleLogin} className="login-form">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              autoComplete="false"
              size="large"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: '16px' }}>
            <Form.Item
              name="isRemember"
              valuePropName="checked"
              initialValue={true}
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className={styles.forgotPassword} href="">
              Forgot your password?
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
