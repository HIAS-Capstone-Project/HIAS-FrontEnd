import { EyeOutlined } from '@ant-design/icons';
import { Card, Col, List, Row, Typography } from 'antd';
import { STATUS_LIST } from 'constants/claim-status';
import DateFormat from 'constants/date-format';
import _ from 'lodash';
import moment from 'moment';
import { IClaim } from 'pages/claim/types';
import React, { useMemo, useState } from 'react';
import StatusProgress from './progress';

const { Title } = Typography;

interface IDetailClaimProps {
  claim: IClaim;
}

// eslint-disable-next-line react/display-name
const DetailClaim = React.forwardRef<HTMLDivElement, IDetailClaimProps>(
  (props: IDetailClaimProps, ref) => {
    const { claim } = props;

    const [statusProgressVisible, setStatusProgressVisible] = useState(false);

    const handleToggleStatusProcess = () => {
      setStatusProgressVisible(pre => !pre);
    };

    const licenseList = useMemo(() => {
      if (_.isEmpty(claim?.claimDocumentResponseDTOS)) return [];
      const licenseNos = [] as number[];
      claim.claimDocumentResponseDTOS.forEach(item => {
        if (!licenseNos.includes(item.licenseResponseDTO.licenseNo)) {
          licenseNos.push(item.licenseResponseDTO.licenseNo);
        }
      });
      return licenseNos.map(licenseNo => {
        const listDocument = claim.claimDocumentResponseDTOS.filter(
          item => item.licenseResponseDTO.licenseNo === licenseNo,
        );
        if (_.isEmpty(listDocument)) {
          return {};
        } else {
          return {
            title: listDocument[0].licenseResponseDTO.label,
            list: listDocument.map(item => {
              return { content: item.originalFileName, src: item.fileUrl };
            }),
          };
        }
      });
    }, [claim]);
    return (
      <Card
        ref={ref}
        title={<Title level={3}>Thông tin chi tiết yêu cầu bồi thường</Title>}
      >
        <Card
          type="inner"
          title={<Title level={4}>Mã yêu cầu bồi thường</Title>}
        >
          {claim?.claimID}
        </Card>
        <Card
          type="inner"
          title={<Title level={4}>Trạng thái</Title>}
          extra={
            <EyeOutlined
              style={{ fontSize: '150%' }}
              onClick={handleToggleStatusProcess}
            />
          }
        >
          {
            STATUS_LIST.find((item: any) => item.key === claim.statusCode)
              ?.value
          }
        </Card>
        <Card
          bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
          type="inner"
          title={<Title level={4}>Thông tin thành viên</Title>}
        >
          <Row style={{ padding: '8px 0' }} gutter={16}>
            <Col span={8}>
              <Card type="inner" title="Tên thành viên">
                {claim?.memberResponseDTO?.memberName}
              </Card>
            </Col>
            <Col span={8}>
              <Card type="inner" title="Giới tính">
                {claim?.memberResponseDTO?.genderEnum === 'F' ? 'Nữ' : 'Nam'}
              </Card>
            </Col>
            <Col span={8}>
              <Card type="inner" title="Mã bảo hiểm">
                {claim?.memberResponseDTO?.healthCardNo}
              </Card>
            </Col>
          </Row>
          <Row style={{ padding: '8px 0' }} gutter={16}>
            <Col span={8}>
              <Card type="inner" title="Tên doanh nghiệp">
                {claim?.clientResponseDTO.clientName}
              </Card>
            </Col>
            <Col span={8}>
              <Card type="inner" title="Tên quyền lợi">
                {claim?.benefitResponseDTO.benefitName}
              </Card>
            </Col>
            <Col span={8}>
              <Card type="inner" title="Thời gian tham gia bảo hiểm">
                Từ
                <strong>{` ${moment(
                  claim?.memberResponseDTO?.startDate,
                  DateFormat.YYYYMMDD,
                ).format(DateFormat.DDMMYYYY)} `}</strong>
                đến
                <strong>{` ${moment(
                  claim?.memberResponseDTO?.endDate,
                  DateFormat.YYYYMMDD,
                ).format(DateFormat.DDMMYYYY)}`}</strong>
              </Card>
            </Col>
          </Row>
        </Card>
        <Card
          bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
          type="inner"
          title={<Title level={4}>Thông tin hồ sơ</Title>}
          // extra={<a href="#"></a>}
        >
          <Row style={{ padding: '8px 0' }} gutter={16}>
            <Col span={8}>
              <Card type="inner" title="Thời gian nộp hồ sơ">
                {moment(claim?.createdOn, DateFormat.YYYYMMDDT).format(
                  DateFormat.DDMMYYYYHHSSMM,
                )}
              </Card>
            </Col>
            <Col span={8}>
              <Card type="inner" title="Thời gian cuối cùng thao tác">
                {moment(claim?.modifiedOn, DateFormat.YYYYMMDDT).format(
                  DateFormat.DDMMYYYYHHSSMM,
                )}
              </Card>
            </Col>
            <Col span={8}>
              <Card type="inner" title="Trạng thái">
                {claim?.statusCode}
              </Card>
            </Col>
          </Row>

          <Row style={{ padding: '8px 0' }} gutter={16}>
            <Col span={8}>
              <Card type="inner" title="Chuẩn đoán bệnh">
                {claim?.description ? claim?.description : 'Không có dữ liệu'}
              </Card>
            </Col>
            <Col span={8}>
              <Card type="inner" title="Ngày khám bệnh">
                {moment(claim?.visitDate, DateFormat.YYYYMMDDT).format(
                  DateFormat.DDMMYYYY,
                )}
              </Card>
            </Col>
            <Col span={8}>
              <Card type="inner" title="Tên bệnh viện">
                {claim?.recordSource === 'M'
                  ? claim?.medicalAddress
                    ? claim?.medicalAddress
                    : 'Không có dữ liệu'
                  : claim?.serviceProviderNo}
              </Card>
            </Col>
          </Row>

          <Row style={{ padding: '8px 0' }} gutter={16}>
            {claim?.admissionFromDate && claim.admissionToDate && (
              <Col span={8}>
                <Card type="inner" title="Thời gian điều trị">
                  Từ
                  <strong>{` ${moment(
                    claim?.admissionFromDate,
                    DateFormat.YYYYMMDDT,
                  ).format(DateFormat.DDMMYYYY)} `}</strong>
                  đến
                  <strong>{` ${moment(
                    claim?.admissionToDate,
                    DateFormat.YYYYMMDDT,
                  ).format(DateFormat.DDMMYYYY)}`}</strong>
                </Card>
              </Col>
            )}
            <Col span={8}>
              <Card type="inner" title="Chi phí yêu cầu bồi thường">
                {(claim?.claimAmount || 0)
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                VNĐ
              </Card>
            </Col>
          </Row>

          {!_.isEmpty(licenseList) && (
            <Row style={{ paddingTop: '8px' }} gutter={16}>
              <Col span={24}>
                <List
                  grid={{
                    gutter: 16,
                    xs: 6,
                    sm: 6,
                    md: 4,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                  }}
                  dataSource={licenseList}
                  renderItem={item => (
                    <List.Item>
                      <Card title={item.title}>
                        {item.list?.map((itemList, index) => (
                          <p key={index}>
                            <a
                              key={index}
                              href={`${itemList.src}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {itemList.content}
                            </a>
                          </p>
                        ))}
                      </Card>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          )}

          <Row style={{ padding: '8px 0' }} gutter={16}>
            {claim?.businessAppraisal && (
              <Col span={8}>
                <Card type="inner" title="Nhân viên xác minh nghiệp vụ">
                  {claim?.businessAppraisal.employeeID} -{' '}
                  {claim?.businessAppraisal.employeeName}
                </Card>
              </Col>
            )}
            {claim?.medicalAppraisal && (
              <Col span={8}>
                <Card type="inner" title="Nhân viên xác minh y tế">
                  {claim?.medicalAppraisal.employeeID} -{' '}
                  {claim?.medicalAppraisal.employeeName}
                </Card>
              </Col>
            )}
            {claim?.approver && (
              <Col span={8}>
                <Card type="inner" title="Nhân viên phê duyệt hồ sơ">
                  {claim?.approver.employeeID} - {claim?.approver.employeeName}
                </Card>
              </Col>
            )}
          </Row>

          <Row style={{ padding: '8px 0' }} gutter={16}>
            {claim?.accountant && (
              <Col span={8}>
                <Card type="inner" title="Nhân viên kế toán">
                  {claim?.accountant.employeeID} -{' '}
                  {claim?.accountant.employeeName}
                </Card>
              </Col>
            )}
            {claim?.paymentAmount && (
              <Col span={8}>
                <Card type="inner" title="Chí phí thành viên được chi trả">
                  {claim?.paymentAmount}
                </Card>
              </Col>
            )}
            {claim?.paymentDate && (
              <Col span={8}>
                <Card type="inner" title="Thời gian chi trả ">
                  {`${moment(claim?.paymentDate, DateFormat.YYYYMMDDT).format(
                    DateFormat.DDMMYYYY,
                  )} `}
                </Card>
              </Col>
            )}
          </Row>
          <Row style={{ padding: '8px 0' }} gutter={16}>
            {claim?.rejectReason && (
              <Col span={8}>
                <Card type="inner" title="Lý do từ chối">
                  {claim?.rejectReason}
                </Card>
              </Col>
            )}
            {claim?.returnReason && (
              <Col span={8}>
                <Card type="inner" title="Lý do trả lại">
                  {claim?.returnReason}
                </Card>
              </Col>
            )}
          </Row>
        </Card>
        {statusProgressVisible && (
          <StatusProgress
            claim={claim}
            onCancel={handleToggleStatusProcess}
            visible={statusProgressVisible}
          />
        )}
      </Card>
    );
  },
);

export default DetailClaim;
