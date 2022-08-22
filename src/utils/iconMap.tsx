import {
  ApartmentOutlined,
  AreaChartOutlined,
  CameraOutlined,
  ClusterOutlined,
  ControlOutlined,
  FolderOutlined,
  GroupOutlined,
  LineOutlined,
  MessageOutlined,
  PartitionOutlined,
  PayCircleOutlined,
  PlusSquareOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const menu: any = {
  'pay-circle-o': <PayCircleOutlined />,
  'shopping-cart': <ShoppingCartOutlined />,
  'camera-o': <CameraOutlined />,
  'line-chart': <LineOutlined />,
  'Manage Claim': <FolderOutlined style={{ fontSize: '150%' }} />,
  'Manage Member': <TeamOutlined style={{ fontSize: '150%' }} />,
  'Manage Employee': <ControlOutlined style={{ fontSize: '150%' }} />,
  Dashboard: <AreaChartOutlined style={{ fontSize: '150%' }} />,
  'Manage Client': <GroupOutlined style={{ fontSize: '150%' }} />,
  'Manage Service Provider': (
    <PlusSquareOutlined style={{ fontSize: '150%' }} />
  ),
  'Manage Policy': <ClusterOutlined style={{ fontSize: '150%' }} />,
  'Manage Benefit': <ApartmentOutlined style={{ fontSize: '150%' }} />,
  'Manage Benefit Item': <PartitionOutlined style={{ fontSize: '150%' }} />,
  team: <TeamOutlined />,
  message: <MessageOutlined />,
};

export default menu;
