import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const Loading = () => {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 104px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ paddingTop: '30%' }}></div>
      <Spin indicator={antIcon} tip="Đang tải..." />
    </div>
  );
};

export default Loading;
