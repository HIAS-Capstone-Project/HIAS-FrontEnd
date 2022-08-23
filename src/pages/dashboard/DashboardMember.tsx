import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const DashboardMember = () => {
  const navigate = useNavigate();
  return (
    <Space
      className="app-container"
      direction="vertical"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      size="large"
    >
      <Button
        size="large"
        type="primary"
        onClick={() => navigate('/create-claim')}
      >
        Tạo yêu cầu bồi thường
      </Button>
      <Button size="large" type="primary" onClick={() => navigate('/claim')}>
        Xem danh sách yêu cầu bồi thường
      </Button>
    </Space>
  );
};

export default DashboardMember;
