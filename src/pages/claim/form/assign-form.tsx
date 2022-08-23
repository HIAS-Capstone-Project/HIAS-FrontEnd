import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Select, Spin } from 'antd';
import STATUS from 'constants/claim-status';
import EMPLOYMENT_TYPE_CODE from 'constants/employee-type';
import _ from 'lodash';
import { IEmployee } from 'pages/employee/types';
import { useEffect, useMemo, useState } from 'react';
import { findEmployeesByTypeCode } from 'services/employee.service';
import { FormProps } from '../types';

const AssignForm = (props: FormProps) => {
  const { form, visible, onCancel, onOk, confirmLoading, claim } = props;
  const [businessAppraisals, setBusinessAppraisals] = useState<IEmployee[]>([]);
  const [medicalAppraisals, setMedicalAppraisals] = useState<IEmployee[]>([]);
  const [approvers, setApprovers] = useState<IEmployee[]>([]);
  const [accountants, setAccountants] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getBusinessAppraisals = async () => {
    setLoading(true);
    await findEmployeesByTypeCode(EMPLOYMENT_TYPE_CODE.BA.key)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          setBusinessAppraisals(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getMedicalAppraisals = async () => {
    setLoading(true);
    findEmployeesByTypeCode(EMPLOYMENT_TYPE_CODE.MA.key)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          setMedicalAppraisals(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getApprovers = async () => {
    setLoading(true);
    findEmployeesByTypeCode(EMPLOYMENT_TYPE_CODE.HM.key)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          setApprovers(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAccountants = async () => {
    setLoading(true);
    findEmployeesByTypeCode(EMPLOYMENT_TYPE_CODE.ACC.key)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          setAccountants(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (visible) {
      getBusinessAppraisals();
      if (
        [STATUS.BUSINESS_VERIFIED, STATUS.MEDICAL_VERIFYING].find(
          status => status.key === claim.statusCode,
        )
      ) {
        getMedicalAppraisals();
      }
      if (
        [STATUS.MEDICAL_VERIFIED, STATUS.WAITING_FOR_APPROVAL].find(
          status => status.key === claim.statusCode,
        )
      ) {
        getMedicalAppraisals();
        getApprovers();
      }
      if (
        [STATUS.APPROVED, STATUS.PAYMENT_PROCESSING].find(
          status => status.key === claim.statusCode,
        )
      ) {
        getMedicalAppraisals();
        getApprovers();
        getAccountants();
      }
    }
  }, [claim.claimNo]);

  const initialValues = useMemo(() => {
    if (_.isEmpty(claim)) return undefined;
    return {
      claimID: claim.claimID,
      memberName: claim.memberResponseDTO.memberName,
      clientName: claim.clientResponseDTO.clientName,
      benefitName: claim.benefitResponseDTO.benefitName,
      businessAppraisalBy: claim.businessAppraisalBy,
      medicalAppraisalBy: claim.medicalAppraisalBy || undefined,
      approvedBy: claim.approver?.employeeNo || undefined,
      paidBy: claim.accountant?.employeeNo || undefined,
    };
  }, [claim.claimNo]);

  return (
    <Modal
      title="Chỉnh sửa thông tin yêu cầu bồi thường"
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Chỉnh sửa"
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
        <Form
          form={form}
          layout="vertical"
          key={claim.claimNo}
          initialValues={initialValues}
        >
          <Form.Item name="claimID" label="Mã yêu cầu bồi thường:">
            <Input disabled size="large" />
          </Form.Item>
          <Form.Item name="memberName" label="Tên thành viên:">
            <Input disabled size="large" />
          </Form.Item>
          <Form.Item name="clientName" label="Tên doanh nghiệp:">
            <Input disabled size="large" />
          </Form.Item>
          <Form.Item name="benefitName" label="Tên quyền lợi:">
            <Input disabled size="large" />
          </Form.Item>
          {!_.isEmpty(claim.businessAppraisal) && (
            <Form.Item
              name="businessAppraisalBy"
              label="Nhân viên xác minh nghiệp vụ:"
            >
              <Select
                disabled={
                  ![
                    STATUS.SUBMITTED.key,
                    STATUS.BUSINESS_VERIFYING.key,
                  ].includes(claim.statusCode)
                }
                showSearch
                size="large"
                placeholder="Chọn nhân viên xác minh nghiệp vụ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare(
                      (optionB!.children as unknown as string).toLowerCase(),
                    )
                }
              >
                {businessAppraisals.map(employee => {
                  return (
                    <Select.Option
                      key={employee.employeeNo}
                      value={employee.employeeNo}
                    >
                      {employee.employeeID} - {employee.employeeName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
          {!_.isEmpty(claim.medicalAppraisal) && (
            <Form.Item
              name="medicalAppraisalBy"
              label="Nhân viên xác minh y tế:"
            >
              <Select
                disabled={
                  ![
                    STATUS.BUSINESS_VERIFIED.key,
                    STATUS.MEDICAL_VERIFYING.key,
                  ].includes(claim.statusCode)
                }
                showSearch
                size="large"
                placeholder="Chọn nhân viên xác minh y tế"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare(
                      (optionB!.children as unknown as string).toLowerCase(),
                    )
                }
              >
                {medicalAppraisals.map(employee => {
                  return (
                    <Select.Option
                      key={employee.employeeNo}
                      value={employee.employeeNo}
                    >
                      {employee.employeeID} - {employee.employeeName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
          {!_.isEmpty(claim.approver) && (
            <Form.Item name="approvedBy" label="Nhân viên phê duyệt hồ sơ:">
              <Select
                disabled={
                  ![
                    STATUS.MEDICAL_VERIFIED.key,
                    STATUS.WAITING_FOR_APPROVAL.key,
                  ].includes(claim.statusCode)
                }
                showSearch
                size="large"
                placeholder="Chọn nhân viên phê duyệt hồ sơ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare(
                      (optionB!.children as unknown as string).toLowerCase(),
                    )
                }
              >
                {approvers.map(employee => {
                  return (
                    <Select.Option
                      key={employee.employeeNo}
                      value={employee.employeeNo}
                    >
                      {employee.employeeID} - {employee.employeeName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
          {!_.isEmpty(claim.accountant) && (
            <Form.Item name="paidBy" label="Nhân viên kế toán:">
              <Select
                disabled={
                  ![
                    STATUS.APPROVED.key,
                    STATUS.PAYMENT_PROCESSING.key,
                  ].includes(claim.statusCode)
                }
                showSearch
                size="large"
                placeholder="Chọn nhân viên kế toán"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare(
                      (optionB!.children as unknown as string).toLowerCase(),
                    )
                }
              >
                {accountants.map(employee => {
                  return (
                    <Select.Option
                      key={employee.employeeNo}
                      value={employee.employeeNo}
                    >
                      {employee.employeeID} - {employee.employeeName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
        </Form>
      )}
    </Modal>
  );
};

export default AssignForm;
