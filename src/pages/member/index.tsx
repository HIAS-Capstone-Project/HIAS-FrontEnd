import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Space,
  Table,
  TablePaginationConfig,
} from 'antd';
import ConfirmDialog from 'components/confirm-dialog';
import { openNotificationWithIcon } from 'components/notification';
import DateFormat from 'constants/date-format';
import { NOT_ACCEPTABLE } from 'constants/http-status';
import _ from 'lodash';
import moment from 'moment';
import { IClient } from 'pages/client/types';
import { IBank, IProvince } from 'pages/member/types';
import { IPolicy } from 'pages/policy/types';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { getAllBank } from 'services/bank.service';
import { getAllClient } from 'services/client.service';
import {
  addMember,
  deleteMember,
  getMembers,
  updateMember,
} from 'services/member.service';
import { getAllPolicy } from 'services/policy.service';
import { getAllProvince } from 'services/province.service';
import AddMemberForm from './form/add-member-form';
import EditMemberForm from './form/edit-member-form';
import { IMember, QueryParams } from './types';
const { Column } = Table;

interface IMemberPageState {
  memberList: IMember[];
  editMemberModalVisible: boolean;
  editMemberModalLoading: boolean;
  currentRowData: IMember;
  addMemberModalVisible: boolean;
  addMemberModalLoading: boolean;
  viewMode: boolean;
  deleteModelVisible: boolean;
}

const MemberPage = () => {
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const initialState = {
    memberList: [] as IMember[],
    editMemberModalVisible: false,
    editMemberModalLoading: false,
    currentRowData: {} as IMember,
    addMemberModalVisible: false,
    addMemberModalLoading: false,
    viewMode: false,
    deleteModelVisible: false,
  };

  const [memberPageState, setMemberPageState] =
    useState<IMemberPageState>(initialState);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    showSizeChanger: true,
    showQuickJumper: true,
    showLessItems: true,
    current: 1,
    pageSize: 5,
    position: ['bottomCenter'],
    pageSizeOptions: [5, 10, 20],
    onShowSizeChange(current, size) {
      setPagination({ ...pagination, pageSize: size, current: 1 });
    },
  });

  const [key, setKey] = useState<string>('');
  const [clients, setClients] = useState<IClient[]>([]);
  const [policies, setPolices] = useState<IPolicy[]>([]);
  const [banks, setBanks] = useState<IBank[]>([]);
  const [provinces, setProvinces] = useState<IProvince[]>([]);

  const {
    memberList,
    addMemberModalVisible,
    addMemberModalLoading,
    currentRowData,
    editMemberModalVisible,
    editMemberModalLoading,
    viewMode,
    deleteModelVisible,
  } = memberPageState;

  const dataSource = useMemo(() => {
    return memberList.map(member => {
      return {
        ...member,
        dob: moment(member.dob).format(DateFormat.DDMMYYYY),
        clientName: clients.find(item => item.clientNo === member.clientNo)
          ?.clientName,
      };
    });
  }, [memberList]);

  const getMemberList = async (params: QueryParams = {}) => {
    getMembers(params).then(res => {
      if (res) {
        setMemberPageState({
          memberList: res.rows,
          currentRowData: {} as IMember,
          addMemberModalVisible: false,
          addMemberModalLoading: false,
          editMemberModalLoading: false,
          editMemberModalVisible: false,
          viewMode: false,
          deleteModelVisible: false,
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
    });
  };

  const getClientList = async () => {
    getAllClient().then(res => {
      if (res) {
        if (_.isEmpty(res)) return;
        setClients(res);
      }
    });
  };

  const getPolicyList = async () => {
    getAllPolicy().then(res => {
      if (res) {
        if (_.isEmpty(res)) return;
        setPolices(res);
      }
    });
  };

  const getBankList = async () => {
    getAllBank().then(res => {
      if (res) {
        if (_.isEmpty(res)) return;
        setBanks(res);
      }
    });
  };

  const getProvinceList = async () => {
    getAllProvince().then(res => {
      if (res) {
        if (_.isEmpty(res)) return;
        setProvinces(res);
      }
    });
  };

  useEffect(() => {
    getMemberList({ pagination });
    getClientList();
    getPolicyList();
    getBankList();
    getProvinceList();
  }, []);

  const handleAddMember = () => {
    setMemberPageState({
      ...memberPageState,
      addMemberModalVisible: true,
    });
  };

  const handleAddMemberOK = () => {
    formAdd.validateFields().then(() => {
      const fieldValue = formAdd.getFieldsValue();

      const value = {
        ...fieldValue,
        staffID: fieldValue.staffID.trim(),
        dob: fieldValue.dateOfBirth.format(DateFormat.DDMMYYYY),
        startDate: fieldValue.timeRange[0].format(DateFormat.DDMMYYYY),
        endDate: fieldValue.timeRange[1].format(DateFormat.DDMMYYYY),
        address: fieldValue.street,
      };
      setMemberPageState({
        ...memberPageState,
        addMemberModalLoading: true,
      });

      addMember(value)
        .then(res => {
          formAdd.resetFields();
          openNotificationWithIcon(
            'success',
            'Thêm thành viên thành công',
            `Thành viên có mã ${value.staffID} đã được thêm mới`,
            'bottomLeft',
          );
          getMemberList({ pagination });
        })
        .catch(e => {
          const { httpStatus, fieldName, errorMessage } = e.response.data;
          if (httpStatus === NOT_ACCEPTABLE) {
            formAdd.setFields([
              {
                name: fieldName,
                errors: [errorMessage],
                value: formAdd.getFieldValue(fieldName).trim(),
              },
            ]);
          }
          setMemberPageState({
            ...memberPageState,
            addMemberModalLoading: false,
          });
        });
    });
    /** @TO_DO catch error after validate FE */
  };

  const handleEditMember = (row: IMember) => {
    setMemberPageState({
      ...memberPageState,
      editMemberModalVisible: true,
      currentRowData: { ...row },
      viewMode: false,
    });
  };

  const handleEditMemberOK = () => {
    if (viewMode) {
      setMemberPageState({
        ...memberPageState,
        viewMode: false,
      });
      return;
    }
    formEdit.validateFields().then(() => {
      const fieldValue = formEdit.getFieldsValue();
      setMemberPageState({
        ...memberPageState,
        editMemberModalLoading: true,
        currentRowData: fieldValue,
      });
      const value = {
        ...fieldValue,
        staffID: fieldValue.staffID.trim(),
        dob: fieldValue.dateOfBirth.format(DateFormat.DDMMYYYY),
        startDate: fieldValue.timeRange[0].format(DateFormat.DDMMYYYY),
        endDate: fieldValue.timeRange[1].format(DateFormat.DDMMYYYY),
        address: fieldValue.street,
      };

      updateMember(value).then(res => {
        openNotificationWithIcon(
          'success',
          'Chỉnh sửa thành viên bệnh thành công',
          `Thành viên có mã ${currentRowData.staffID} đã được cập nhật`,
          'bottomLeft',
        );
        getMemberList({ pagination });
      });
      formEdit.resetFields();
    });
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getMemberList({ pagination: newPagination, key });
  };

  const onSearch = (value: string) => {
    setKey(value);
    getMemberList({ pagination, key: value });
  };

  const handleDeleteMember = async (memberNo: number, staffID: string) => {
    await deleteMember(memberNo).then(() => {
      openNotificationWithIcon(
        'error',
        'Xóa nhân viên thành công',
        `Nhân viên có mã ${staffID} đã được xóa`,
        'bottomLeft',
      );
      getMemberList({ pagination });
    });
  };

  const title = (
    <Space
      direction="horizontal"
      style={{ justifyContent: 'space-between', width: '100%' }}
    >
      <span>
        <Button size="large" type="primary" onClick={handleAddMember}>
          Thêm Thành viên
        </Button>
      </span>
      <Input.Search
        placeholder="Nhập vào giá trị muốn tìm kiếm"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />
    </Space>
  );

  const handleCancel = () => {
    formAdd.resetFields();
    formEdit.resetFields();
    setMemberPageState({
      ...memberPageState,
      addMemberModalVisible: false,
      editMemberModalVisible: false,
      currentRowData: {} as IMember,
      viewMode: false,
    });
  };

  return (
    <div className="app-container">
      <Card title={title}>
        <Table
          rowClassName="app-row"
          onRow={record => {
            return {
              onClick: () => {
                setMemberPageState({
                  ...memberPageState,
                  editMemberModalVisible: true,
                  viewMode: true,
                  currentRowData: record,
                });
              },
            };
          }}
          bordered
          rowKey="memberNo"
          dataSource={dataSource}
          pagination={pagination}
          onChange={handleTableChange}
        >
          <Column
            title="Mã thẻ bảo hiểm"
            dataIndex="healthCardNo"
            key="healthCardNo"
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
          <Column title="Ngày sinh" dataIndex="dob" key="dob" align="center" />
          <Column title="Email" dataIndex="email" key="email" align="center" />
          <Column
            title="Số điện thoại"
            dataIndex="phoneNumber"
            key="phoneNumber"
            align="center"
          />
          <Column
            title="Thao tác"
            key="action"
            align="center"
            render={(text, row: IMember) => (
              <span>
                <EditTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleEditMember(row);
                  }}
                />
                <Divider type="vertical" />
                <DeleteTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    setMemberPageState({
                      ...memberPageState,
                      currentRowData: row,
                      deleteModelVisible: true,
                    });
                  }}
                />
              </span>
            )}
          />
        </Table>
      </Card>
      <EditMemberForm
        provinces={provinces}
        banks={banks}
        clients={clients}
        policies={policies}
        viewMode={viewMode}
        currentRowData={currentRowData}
        form={formEdit}
        visible={editMemberModalVisible}
        confirmLoading={editMemberModalLoading}
        onCancel={handleCancel}
        onOk={handleEditMemberOK}
      />
      <AddMemberForm
        provinces={provinces}
        banks={banks}
        clients={clients}
        policies={policies}
        form={formAdd}
        visible={addMemberModalVisible}
        confirmLoading={addMemberModalLoading}
        onCancel={handleCancel}
        onOk={handleAddMemberOK}
      />
      <ConfirmDialog
        visible={deleteModelVisible}
        title="Xóa thành viên"
        content={`Bạn có đồng ý xóa thành viên ${currentRowData.memberName} hay không?`}
        onOK={() =>
          handleDeleteMember(currentRowData.memberNo, currentRowData.staffID)
        }
        onCancel={() =>
          setMemberPageState({
            ...memberPageState,
            currentRowData: {} as IMember,
            deleteModelVisible: false,
          })
        }
      />
    </div>
  );
};

export default MemberPage;
