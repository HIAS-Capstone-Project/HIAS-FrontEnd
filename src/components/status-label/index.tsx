import { Button, Tag, Tooltip } from 'antd';
import { mappingColorStatus } from 'helper';

interface IStatus {
  statusCode: string;
  tooltip: string;
}

const Status = (props: IStatus) => {
  const { statusCode, tooltip } = props;
  return (
    <Tooltip placement="bottom" title={tooltip}>
      <Tag color={mappingColorStatus(statusCode)}>{statusCode}</Tag>
    </Tooltip>
  );
};

export default Status;
