import {
  ExportOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Table,
  TablePaginationConfig,
} from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ConfirmDialog from 'components/confirm-dialog';
import Loading from 'components/loading';
import { openNotificationWithIcon } from 'components/notification';
import STATUS from 'constants/claim-status';
import DateFormat from 'constants/date-format';
import ROLE from 'constants/roles';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import { IUser } from 'features/authentication/types';
import { selectLayout, showLoading } from 'features/layout/layoutSlice';
import { isVerifyingStatus } from 'helper';
import _ from 'lodash';
import moment from 'moment';
import { IClaim, QueryParams } from 'pages/claim/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  approveClaim,
  businessVerified,
  getClaims,
  getDetailClaim,
  medicalVerified,
  startProgressVerify,
} from 'services/claim.service';
import DetailClaim from './DetailClaim';
import RejectForm from './form/reject-form';
import SettleForm from './form/settle-form';

const { Column } = Table;

interface IClaimPageState {
  claimList: IClaim[];
  currentRowData: IClaim;
  confirmVisible: boolean;
  rejectVisible: boolean;
  settleVisible: boolean;
  rejectLoadding: boolean;
  settleLoading: boolean;
  dialogContent?: {
    title: string;
    content: string;
    onOK: () => void;
    onCancel: () => void;
  };
}

const ManageClaim = () => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(selectLayout);
  const user = useAppSelector(selectCurrentUser) as IUser;
  const initialState = {
    claimList: [] as IClaim[],
    currentRowData: {} as IClaim,
    confirmVisible: false,
    rejectVisible: false,
    settleVisible: false,
    rejectLoadding: false,
    settleLoading: false,
  };

  const [formSettle] = Form.useForm();
  const [formReject] = Form.useForm();

  const ref = useRef<any>(null);
  const [claimPageState, setClaimPageState] =
    useState<IClaimPageState>(initialState);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    showSizeChanger: true,
    showQuickJumper: true,
    showLessItems: true,
    current: 1,
    pageSize: 10,
    position: ['bottomCenter'],
    pageSizeOptions: [10, 20, 50],
    onShowSizeChange(current, size) {
      setPagination({ ...pagination, pageSize: size, current: 1 });
    },
  });

  const [key, setKey] = useState<string>('');
  const [claim, setClaim] = useState<IClaim>({} as IClaim);

  const {
    claimList,
    currentRowData,
    confirmVisible,
    rejectLoadding,
    rejectVisible,
    settleLoading,
    settleVisible,
    dialogContent,
  } = claimPageState;
  const { claimNo } = currentRowData;

  const dataSource = useMemo(() => {
    return claimList.map(claim => {
      return {
        ...claim,
        memberName: claim.memberResponseDTO.memberName,
        // status : ,
        benefitName: claim.benefitResponseDTO.benefitName,
        clientName: claim.clientResponseDTO.clientName,
        lastModified: moment(claim.modifiedOn, DateFormat.YYYYMMDDT).format(
          DateFormat.DDMMYYYYHHSSMM,
        ),
      };
    });
  }, [claimList]);

  const getClaimList = async (params: QueryParams = {}) => {
    dispatch(showLoading(true));
    getClaims(params)
      .then(res => {
        if (res) {
          setClaimPageState({
            claimList: res.rows,
            currentRowData: {} as IClaim,
            confirmVisible: false,
            rejectLoadding: false,
            rejectVisible: false,
            settleLoading: false,
            settleVisible: false,
          });
          setPagination({
            ...pagination,
            total: res.totalElements,
            current: res.pageNumber + 1,
            pageSize: params.pagination?.pageSize,
            showTotal: (total, range) => {
              if (params.pagination?.pageSize === 1 || res.rows.length === 1)
                return `${range[0]} trong ${total}`;
              return `${range[0]}-${range[1]} trong ${total}`;
            },
          });
        }
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  const getClaim = async (claimNo: number) => {
    dispatch(showLoading(true));
    getDetailClaim(claimNo)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          setClaim(res);
        }
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  useEffect(() => {
    if (claimNo) {
      getClaim(claimNo);
    }
  }, [claimNo]);

  useEffect(() => {
    getClaimList({ pagination });
  }, []);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [claim]);

  const onSearch = (value: string) => {
    setKey(value);
    setClaim({} as IClaim);
    getClaimList({ pagination, key: value });
  };

  const title = (
    <Space
      direction="horizontal"
      style={{ justifyContent: 'space-between', width: '100%' }}
    >
      <Space
        direction="horizontal"
        // style={{ justifyContent: 'space-between', width: '100%' }}
      >
        <Button
          size="large"
          type="primary"
          // onClick={}
        >
          Thêm Yêu cầu bồi thường
        </Button>
        <Select
          showSearch
          size="large"
          placeholder="Chọn công ty"
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
          {/* {benefits.map(benefit => {
            return (
              <Select.Option key={benefit.benefitNo} value={benefit.benefitNo}>
                {benefit.benefitName}
              </Select.Option>
            );
          })} */}
        </Select>
        <Select
          showSearch
          size="large"
          placeholder="Chọn trạng thái"
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
          {/* {benefits.map(benefit => {
            return (
              <Select.Option key={benefit.benefitNo} value={benefit.benefitNo}>
                {benefit.benefitName}
              </Select.Option>
            );
          })} */}
        </Select>
      </Space>
      <Input.Search
        width={600}
        placeholder="Nhập vào giá trị muốn tìm kiếm"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />
    </Space>
  );

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getClaimList({ pagination: newPagination, key });
  };

  const startProgress = async (claim: IClaim) => {
    dispatch(showLoading(true));
    startProgressVerify(claim.statusCode)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          openNotificationWithIcon(
            'success',
            'Quá trình thẩm định bắt đầu thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} đã được chuyển trạng thái`,
            'bottomLeft',
          );
          getClaimList({ pagination });
        }
      })
      .catch(() => {
        openNotificationWithIcon(
          'error',
          'Quá trình thẩm định bắt đầu thất bại',
          `Xảy ra lỗi trong quá trình chuyển trạng thái của yêu cầu bồi thường có mã ${claim.claimID} `,
          'bottomLeft',
        );
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  const business = async (claim: IClaim) => {
    dispatch(showLoading(true));
    businessVerified(claim.statusCode)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          openNotificationWithIcon(
            'success',
            'Thẩm định thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} đã được chuyển trạng thái`,
            'bottomLeft',
          );
          getClaimList({ pagination });
        }
      })
      .catch(() => {
        openNotificationWithIcon(
          'error',
          'Thẩm định thất bại',
          `Xảy ra lỗi trong quá trình chuyển trạng thái của yêu cầu bồi thường có mã ${claim.claimID} `,
          'bottomLeft',
        );
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  const medical = async (claim: IClaim) => {
    dispatch(showLoading(true));
    medicalVerified(claim.statusCode)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          openNotificationWithIcon(
            'success',
            'Thẩm định thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} đã được chuyển trạng thái`,
            'bottomLeft',
          );
          getClaimList({ pagination });
        }
      })
      .catch(() => {
        openNotificationWithIcon(
          'error',
          'Thẩm định thất bại',
          `Xảy ra lỗi trong quá trình chuyển trạng thái của yêu cầu bồi thường có mã ${claim.claimID} `,
          'bottomLeft',
        );
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  const approve = async (claim: IClaim) => {
    dispatch(showLoading(true));
    approveClaim(claim.statusCode)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          openNotificationWithIcon(
            'success',
            'Thẩm định thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} đã được chuyển trạng thái`,
            'bottomLeft',
          );
          getClaimList({ pagination });
        }
      })
      .catch(() => {
        openNotificationWithIcon(
          'error',
          'Thẩm định thất bại',
          `Xảy ra lỗi trong quá trình chuyển trạng thái của yêu cầu bồi thường có mã ${claim.claimID} `,
          'bottomLeft',
        );
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  const handleCancel = () => {
    formReject.resetFields();
    formSettle.resetFields();
    setClaimPageState({
      ...claimPageState,
      rejectVisible: false,
      settleVisible: false,
      currentRowData: {} as IClaim,
    });
  };

  const handleStartProgress = (claim: IClaim) => {
    setClaimPageState({
      ...claimPageState,
      confirmVisible: true,
      currentRowData: { ...claim },
      dialogContent: {
        title: 'Bắt đầu quá trình phê duyệt',
        content: `Bạn có đồng ý bắt đầu quá trình phê duyệt yêu cầu bồi thường có mã ${claim.claimID}`,
        onOK: () => {
          startProgress(claim);
        },
        onCancel: () => {
          handleCancel();
        },
      },
    });
  };

  const renderIcon = (claim: IClaim, role: string) => {
    let isShowIcon = false;
    switch (role) {
      case ROLE.BUSINESS_APPRAISER:
        if (
          [STATUS.SUBMITTED, STATUS.BUSINESS_VERIFYING].find(
            status => status.key === claim.statusCode,
          )
        ) {
          isShowIcon = true;
        }
        break;
      case ROLE.MEDICAL_APPRAISER:
        if (
          [STATUS.BUSINESS_VERIFIED, STATUS.MEDICAL_VERIFYING].find(
            status => status.key === claim.statusCode,
          )
        ) {
          isShowIcon = true;
        }
        break;
      case ROLE.HEALTH_MODERATOR:
        if (
          [STATUS.MEDICAL_VERIFIED, STATUS.WAITING_FOR_APPROVAL].find(
            status => status.key === claim.statusCode,
          )
        ) {
          isShowIcon = true;
        }
        break;
      case ROLE.ACCOUNTANT:
        if (
          [STATUS.APPROVED, STATUS.PAYMENT_PROCESSING].find(
            status => status.key === claim.statusCode,
          )
        ) {
          isShowIcon = true;
        }
        break;
      default:
        isShowIcon = false;
    }
    if (isShowIcon) {
      if (isVerifyingStatus(claim.statusCode)) {
        return (
          <>
            <FileDoneOutlined
              style={{ fontSize: '200%', color: '#52c41a' }}
              onClick={() => {
                switch (role) {
                  case ROLE.BUSINESS_APPRAISER:
                    business(claim);
                    break;
                  case ROLE.MEDICAL_APPRAISER:
                    medical(claim);
                    break;
                  case ROLE.HEALTH_MODERATOR:
                    approve(claim);
                    break;
                  case ROLE.ACCOUNTANT:
                    break;
                }
              }}
            />
            <Divider type="vertical" style={{ fontSize: '200%' }} />
            <FileExcelOutlined style={{ fontSize: '200%', color: '#ff4d4f' }} />
          </>
        );
      } else {
        return (
          <ExportOutlined
            style={{ fontSize: '200%', color: '#faad14' }}
            onClick={(e: any) => {
              e.stopPropagation();
              handleStartProgress(claim);
            }}
          />
        );
      }
    }
    return <></>;
  };

  return (
    <>
      {layout.isloading ? (
        <Loading />
      ) : (
        <div className="app-container">
          <Card title={title}>
            <Table
              rowClassName="app-row"
              onRow={record => {
                return {
                  onClick: () => {
                    setClaimPageState({
                      ...claimPageState,
                      currentRowData: record,
                    });
                  },
                };
              }}
              bordered
              rowKey="claimID"
              dataSource={dataSource}
              pagination={pagination}
              onChange={handleTableChange}
            >
              <Column
                title="Mã hồ sơ"
                dataIndex="claimID"
                key="claimID"
                align="center"
              />
              <Column
                title="Tên thành viên"
                dataIndex="memberName"
                key="memberName"
                align="center"
              />
              <Column
                title="Tên công ty"
                dataIndex="clientName"
                key="clientName"
                align="center"
              />
              <Column
                title="Tên quyền lợi"
                dataIndex="benefitName"
                key="benefitName"
                align="center"
              />
              <Column
                title="Trạng thái"
                dataIndex="status"
                key="status"
                align="center"
              />
              <Column
                title="Lần cuối sửa đổi"
                dataIndex="lastModified"
                key="lastModified"
                align="center"
              />
              <Column
                title="Thao tác"
                key="action"
                align="center"
                render={(text, row: IClaim) => {
                  return <span>{renderIcon(row, user.role)}</span>;
                }}
              />
            </Table>
          </Card>
          {!_.isEmpty(claim) && <DetailClaim ref={ref} claim={claim} />}
          {/* <RejectForm
            claim={currentRowData}
            confirmLoading={rejectLoadding}
            form={formReject}
            visible={rejectVisible}
            onOk={}
            onCancel={}
          />
          <SettleForm
            claim={currentRowData}
            confirmLoading={settleLoading}
            form={formSettle}
            visible={settleVisible}
            onOk={}
            onCancel={}
          /> */}
          {/* <ConfirmDialog
            visible={v}
            title="Xóa nhân viên"
            content={`Bạn có đồng ý xóa nhân viên ${currentRowData.employeeName} hay không?`}
            onOK={() =>
              handleDeleteEmployee(
                currentRowData.employeeNo,
                currentRowData.employeeID,
              )
            }
            onCancel={() =>
              setEmployeePageState({
                ...employeePageState,
                currentRowData: {} as IEmployee,
                deleteModelVisible: false,
              })
            }
          /> */}
        </div>
      )}
    </>
  );
};

export default ManageClaim;
