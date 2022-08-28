import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Spin, Timeline } from 'antd';
import { mappingColorStatus } from 'helper';
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
          setData(res.reverse());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderTimeLineItemContent = (item: IClaimHistoryResponseDTO) => {
    if (item.actionType === 'ACP') {
      return `Hệ thống ${item.remark}`;
    } else if (_.isEmpty(item.employeeResponseDTO)) {
      return `${item.memberResponseDTO.memberName} ${item.remark}`;
    } else if (!_.isEmpty(item.employeeResponseDTO)) {
      return `${item.employeeResponseDTO.employeeName} ${item.remark}`;
    }
  };

  const renderTimeLineContent = () => {
    return (
      <Timeline mode="left">
        {data.map(item => {
          return (
            <Timeline.Item
              color={mappingColorStatus(item.toStatusCode)}
              key={item.claimRequestHistoryNo}
              label={moment(item.createdOn, DateFormat.YYYYMMDDT).format(
                DateFormat.DDMMYYYYHHSSMM,
              )}
            >
              {renderTimeLineItemContent(item)}
            </Timeline.Item>
          );
        })}
      </Timeline>
    );
  };

  useEffect(() => {
    if (!_.isEmpty(claim)) {
      getHistoryProgress(claim.claimNo);
    }
  }, [claim.claimNo]);

  return (
    <Modal
      width={700}
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
        renderTimeLineContent()
      )}
    </Modal>
  );
};

export default StatusProgress;
