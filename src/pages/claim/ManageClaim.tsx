import {
  CloseCircleOutlined,
  EditTwoTone,
  ExportOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  ReloadOutlined,
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
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {
  approveClaim,
  businessVerified,
  getClaims,
  getDetailClaim,
  medicalVerified,
  rejectClaim,
  returnClaim,
  settleClaim,
  startProgressVerify,
  updateClaim,
} from 'services/claim.service';
import dashboardLinks from '../../pages/links';
import { cancelClaim } from './../../services/claim.service';
import DetailClaim from './DetailClaim';
import AssignForm from './form/assign-form';
import RejectForm from './form/reject-form';
import ReturnForm from './form/return-form';
import SettleForm from './form/settle-form';

const { Column } = Table;

interface IDialog {
  title: string;
  content: string;
  onOK: () => void;
  onCancel: () => void;
}

interface IClaimPageState {
  claimList: IClaim[];
  currentRowData: IClaim;
  confirmVisible: boolean;
  rejectVisible: boolean;
  settleVisible: boolean;
  rejectLoading: boolean;
  settleLoading: boolean;
  dialogContent?: IDialog;
  assignLoading: boolean;
  assignVisible: boolean;
  returnVisible: boolean;
  returnLoading: boolean;
}

const ManageClaim = () => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(selectLayout);
  const user = useAppSelector(selectCurrentUser) as IUser;
  const navigate = useNavigate();
  const initialState = {
    claimList: [] as IClaim[],
    currentRowData: {} as IClaim,
    confirmVisible: false,
    rejectVisible: false,
    settleVisible: false,
    rejectLoading: false,
    settleLoading: false,
    assignLoading: false,
    assignVisible: false,
    returnVisible: false,
    returnLoading: false,
  };

  const [formSettle] = Form.useForm();
  const [formReject] = Form.useForm();
  const [formReturn] = Form.useForm();
  const [formAssign] = Form.useForm();
  const location = useLocation();

  const readonly = dashboardLinks[user.role].find((x: any) => {
    return x.to == location.pathname;
  }).readonly;

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
    rejectLoading,
    rejectVisible,
    settleLoading,
    settleVisible,
    assignLoading,
    assignVisible,
    dialogContent,
    returnLoading,
    returnVisible,
  } = claimPageState;
  const { claimNo } = currentRowData;

  const dataSource = useMemo(() => {
    return claimList.map(claim => {
      return {
        ...claim,
        memberName: claim.memberResponseDTO.memberName,
        status: claim.statusCode,
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
            rejectLoading: false,
            rejectVisible: false,
            settleLoading: false,
            settleVisible: false,
            assignLoading: false,
            assignVisible: false,
            returnVisible: false,
            returnLoading: false,
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
    if (
      claimNo &&
      !confirmVisible &&
      !rejectVisible &&
      !settleVisible &&
      !assignVisible &&
      !returnVisible
    ) {
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
        {!readonly && (
          <Button
            size="large"
            type="primary"
            // onClick={}
          >
            Thêm Yêu cầu bồi thường
          </Button>
        )}
        <Select
          showSearch
          size="large"
          placeholder="Chọn doanh nghiệp"
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
    startProgressVerify(claim.claimNo)
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
        setClaimPageState({
          ...claimPageState,
          confirmVisible: false,
          dialogContent: {} as IDialog,
        });
      });
  };

  const cancelClaimAction = async (claim: IClaim) => {
    dispatch(showLoading(true));
    cancelClaim(claim.claimNo)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          openNotificationWithIcon(
            'success',
            'Hủy yêu cầu bồi thường thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} đã bị hủy`,
            'bottomLeft',
          );
          getClaimList({ pagination });
        }
      })
      .catch(() => {
        openNotificationWithIcon(
          'error',
          'Hủy yêu cầu bồi thường thất bại',
          `Xảy ra lỗi trong quá trình hủy của yêu cầu bồi thường có mã ${claim.claimID} `,
          'bottomLeft',
        );
      })
      .finally(() => {
        dispatch(showLoading(false));
        setClaimPageState({
          ...claimPageState,
          confirmVisible: false,
          dialogContent: {} as IDialog,
        });
      });
  };

  const business = async (claim: IClaim) => {
    dispatch(showLoading(true));
    businessVerified(claim.claimNo)
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
        setClaimPageState({
          ...claimPageState,
          confirmVisible: false,
          dialogContent: {} as IDialog,
        });
      });
  };

  const medical = async (claim: IClaim) => {
    dispatch(showLoading(true));
    medicalVerified(claim.claimNo)
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
        setClaimPageState({
          ...claimPageState,
          confirmVisible: false,
          dialogContent: {} as IDialog,
        });
      });
  };

  const approve = async (claim: IClaim) => {
    dispatch(showLoading(true));
    approveClaim(claim.claimNo)
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
        setClaimPageState({
          ...claimPageState,
          confirmVisible: false,
          dialogContent: {} as IDialog,
        });
      });
  };

  const handleCancel = () => {
    formReject.resetFields();
    formSettle.resetFields();
    setClaimPageState({
      ...claimPageState,
      rejectVisible: false,
      settleVisible: false,
      confirmVisible: false,
      assignVisible: false,
      returnVisible: false,
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

  const handleCancelClaim = (claim: IClaim) => {
    setClaimPageState({
      ...claimPageState,
      confirmVisible: true,
      currentRowData: { ...claim },
      dialogContent: {
        title: 'Hủy yêu cầu bồi thường',
        content: `Bạn có đồng ý hủy yêu cầu bồi thường có mã ${claim.claimID} không?`,
        onOK: () => {
          cancelClaimAction(claim);
        },
        onCancel: () => {
          handleCancel();
        },
      },
    });
  };

  const handleVerify = (claim: IClaim) => {
    setClaimPageState({
      ...claimPageState,
      confirmVisible: true,
      currentRowData: { ...claim },
      dialogContent: {
        title: 'Phê duyệt yêu cầu bồi thường',
        content: `Bạn có đồng ý phê duyệt yêu cầu bồi thường có mã ${claim.claimID}`,
        onOK: () => {
          switch (user.role) {
            case ROLE.BUSINESS_APPRAISER:
              business(claim);
              break;
            case ROLE.MEDICAL_APPRAISER:
              medical(claim);
              break;
            case ROLE.HEALTH_MODERATOR:
              approve(claim);
              break;
            default:
              handleCancel();
              break;
          }
        },
        onCancel: () => {
          handleCancel();
        },
      },
    });
  };

  const handleReject = (claim: IClaim) => {
    setClaimPageState({
      ...claimPageState,
      rejectVisible: true,
      currentRowData: { ...claim },
    });
  };

  const handleRejectOK = () => {
    formReject.validateFields().then(() => {
      const fieldValue = formReject.getFieldsValue();
      fieldValue.claimNo = claimNo;
      setClaimPageState({ ...claimPageState, rejectLoading: true });
      rejectClaim(fieldValue)
        .then(res => {
          formReject.resetFields();
          openNotificationWithIcon(
            'success',
            'Từ chối yêu cầu bồi thường thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} đã bị từ chối`,
            'bottomLeft',
          );
          getClaimList({ pagination });
        })
        .catch(() => {
          openNotificationWithIcon(
            'error',
            'Từ chối yêu cầu bồi thường không thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} chưa bị từ chối`,
            'bottomLeft',
          );
          setClaimPageState({ ...claimPageState, rejectLoading: false });
        });
    });
  };

  const handleReturn = (claim: IClaim) => {
    setClaimPageState({
      ...claimPageState,
      returnVisible: true,
      currentRowData: { ...claim },
    });
  };

  const handleReturnOK = () => {
    formReturn.validateFields().then(() => {
      const fieldValue = formReturn.getFieldsValue();
      fieldValue.claimNo = claimNo;
      setClaimPageState({ ...claimPageState, returnLoading: true });
      returnClaim(fieldValue)
        .then(res => {
          formReturn.resetFields();
          openNotificationWithIcon(
            'success',
            'Trả lại yêu cầu bồi thường thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} đã được trả lại`,
            'bottomLeft',
          );
          getClaimList({ pagination });
        })
        .catch(() => {
          openNotificationWithIcon(
            'error',
            'Trả lại yêu cầu bồi thường không thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} chưa được trả lại`,
            'bottomLeft',
          );
          setClaimPageState({ ...claimPageState, returnLoading: false });
        });
    });
  };

  const handleSettle = (claim: IClaim) => {
    setClaimPageState({
      ...claimPageState,
      settleVisible: true,
      currentRowData: { ...claim },
    });
  };

  const handleSettleOK = () => {
    formSettle.validateFields().then(() => {
      const fieldValue = formSettle.getFieldsValue();
      fieldValue.claimNo = claimNo;
      setClaimPageState({ ...claimPageState, settleLoading: true });
      settleClaim(fieldValue)
        .then(res => {
          formSettle.resetFields();
          openNotificationWithIcon(
            'success',
            'Thanh toán yêu cầu bồi thường thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} đã được thanh toán`,
            'bottomLeft',
          );
          getClaimList({ pagination });
        })
        .catch(() => {
          openNotificationWithIcon(
            'error',
            'Thanh toán yêu cầu bồi thường không thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} chưa được thanh toán`,
            'bottomLeft',
          );
          setClaimPageState({ ...claimPageState, settleLoading: false });
        });
    });
  };

  const handleAssign = async (claim: IClaim) => {
    dispatch(showLoading(true));
    getDetailClaim(claim.claimNo)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          setClaimPageState({
            ...claimPageState,
            assignVisible: true,
            currentRowData: { ...res },
          });
        }
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  const handleAssignOK = () => {
    formAssign.validateFields().then(() => {
      const fieldValue = formAssign.getFieldsValue();
      fieldValue.claimNo = claimNo;
      delete fieldValue.benefitName;
      delete fieldValue.claimID;
      delete fieldValue.clientName;
      delete fieldValue.memberName;
      const value = {
        ...fieldValue,
        medicalAppraisalBy: fieldValue.medicalAppraisalBy || undefined,
        approvedBy: fieldValue.approvedBy || undefined,
        paidBy: fieldValue.paidBy || undefined,
      };
      setClaimPageState({ ...claimPageState, assignLoading: true });
      updateClaim(value)
        .then(res => {
          formAssign.resetFields();
          openNotificationWithIcon(
            'success',
            'Chỉnh sửa thông tin yêu cầu bồi thường thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} đã được chỉnh sửa người tham gia kiểm duyệt/thanh toán`,
            'bottomLeft',
          );
          getClaimList({ pagination });
        })
        .catch(() => {
          openNotificationWithIcon(
            'error',
            'Chỉnh sửa thông tin yêu cầu bồi thường không thành công',
            `Yêu cầu bồi thường có mã ${claim.claimID} chưa được chỉnh sửa người tham gia kiểm duyệt/thanh toán`,
            'bottomLeft',
          );
          setClaimPageState({ ...claimPageState, assignLoading: false });
        });
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
      case ROLE.ADMIN:
        if (
          [
            STATUS.SUBMITTED,
            STATUS.BUSINESS_VERIFYING,
            STATUS.BUSINESS_VERIFIED,
            STATUS.MEDICAL_VERIFYING,
            STATUS.MEDICAL_VERIFIED,
            STATUS.WAITING_FOR_APPROVAL,
            STATUS.APPROVED,
            STATUS.PAYMENT_PROCESSING,
          ].find(status => status.key === claim.statusCode)
        ) {
          isShowIcon = true;
        }
        break;
      default:
        isShowIcon = false;
    }
    if (isShowIcon) {
      if (role === ROLE.ADMIN) {
        return (
          <EditTwoTone
            style={{ fontSize: '200%' }}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              handleAssign(claim);
            }}
          />
        );
      }
      if (isVerifyingStatus(claim.statusCode)) {
        return (
          <>
            <FileDoneOutlined
              style={{ fontSize: '200%', color: '#52c41a' }}
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                if (user.role === ROLE.ACCOUNTANT) {
                  handleSettle(claim);
                } else {
                  handleVerify(claim);
                }
              }}
            />
            <Divider type="vertical" style={{ fontSize: '200%' }} />
            <FileExcelOutlined
              style={{ fontSize: '200%', color: '#ff4d4f' }}
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                handleReject(claim);
              }}
            />
            {role !== ROLE.ACCOUNTANT && (
              <>
                <Divider type="vertical" style={{ fontSize: '200%' }} />
                <ReloadOutlined
                  style={{ fontSize: '200%', color: '#52c41a' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleReturn(claim);
                  }}
                />
              </>
            )}
          </>
        );
      } else {
        return (
          <ExportOutlined
            style={{ fontSize: '200%', color: '#faad14' }}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              handleStartProgress(claim);
            }}
          />
        );
      }
    }

    if (
      claim.statusCode === STATUS.DRAFT.key ||
      (claim.statusCode === STATUS.RETURN.key &&
        (role === ROLE.MEMBER || role === ROLE.SERVICE_PROVIDER))
    ) {
      return (
        <>
          <EditTwoTone
            style={{ fontSize: '200%' }}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              navigate(`/create-claim/${claim.claimNo}`);
            }}
          />
          <Divider type="vertical" style={{ fontSize: '200%' }} />
          <CloseCircleOutlined
            style={{ fontSize: '200%', color: '#ff4d4f' }}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              handleCancelClaim(claim);
            }}
          />
        </>
      );
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
                title="Tên doanh nghiệp"
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
              {!readonly && (
                <Column
                  title="Thao tác"
                  key="action"
                  align="center"
                  render={(text, row: IClaim) => {
                    return <span>{renderIcon(row, user.role)}</span>;
                  }}
                />
              )}
            </Table>
          </Card>
          {!_.isEmpty(claim) && <DetailClaim ref={ref} claim={claim} />}
          <RejectForm
            claim={currentRowData}
            confirmLoading={rejectLoading}
            form={formReject}
            visible={rejectVisible}
            onOk={handleRejectOK}
            onCancel={handleCancel}
          />
          <ReturnForm
            claim={currentRowData}
            confirmLoading={returnLoading}
            form={formReturn}
            visible={returnVisible}
            onOk={handleReturnOK}
            onCancel={handleCancel}
          />
          <SettleForm
            claim={currentRowData}
            confirmLoading={settleLoading}
            form={formSettle}
            visible={settleVisible}
            onOk={handleSettleOK}
            onCancel={handleCancel}
          />
          <AssignForm
            claim={currentRowData}
            confirmLoading={assignLoading}
            form={formAssign}
            visible={assignVisible}
            onOk={handleAssignOK}
            onCancel={handleCancel}
          />

          <ConfirmDialog
            visible={confirmVisible}
            title={dialogContent?.title || ''}
            content={dialogContent?.content || ''}
            onOK={dialogContent?.onOK || handleCancel}
            onCancel={dialogContent?.onCancel || handleCancel}
          />
        </div>
      )}
    </>
  );
};

export default ManageClaim;
