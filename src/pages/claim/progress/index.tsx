import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Spin, Timeline } from 'antd';
import _ from 'lodash';
import { IClaimHistoryResponseDTO } from 'models/claim/types';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getStatusProcessClaim } from 'services/claim.service';
import DateFormat from './../../../constants/date-format';
import { IClaim } from './../types';

interface IProps {
  visible: boolean;
  claim: IClaim;
  onCancel: () => void;
}
const StatusProgress = (props: IProps) => {
  const { visible, claim, onCancel } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IClaimHistoryResponseDTO[]>([]);

  const getHistoryProgress = async (claimNo: number) => {
    setLoading(true);
    getStatusProcessClaim(claimNo)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          setData(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!_.isEmpty(claim)) {
      getHistoryProgress(claim.claimNo);
    }
  }, [claim.claimNo]);

  return (
    <Modal
      title="Chi tiết trạng thái của yêu cầu bồi thường"
      visible={visible}
      onCancel={() => {
        setData([]);
        onCancel();
      }}
      footer={null}
      maskClosable={false}
    >
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            tip="Đang tải..."
          />
        </div>
      ) : (
        <Timeline mode="left">
          {data.map(item => {
            return (
              <Timeline.Item
                key={item.claimRequestHistoryNo}
                label={moment(item.createdOn, DateFormat.YYYYMMDDT).format(
                  DateFormat.DDMMYYYYHHSSMM,
                )}
              >
                {`${item.employeeResponseDTO.employeeName} đã ${item.remark}`}
              </Timeline.Item>
            );
          })}
        </Timeline>
      )}
    </Modal>
  );
};

export default StatusProgress;
