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
import { MouseEvent, useEffect, useState } from 'react';
import {
  addBenefit,
  deleteBenefit,
  getBenefits,
  updateBenefit,
} from 'services/benefit.service';
import { NOT_ACCEPTABLE } from './../../constants';
import AddBenefitForm from './form/add-benefit-form';
import EditBenefitForm from './form/edit-benefit-form';
import { IBenefit, QueryParams } from './types';
const { Column } = Table;

interface BenefitPageState {
  benefitList: IBenefit[];
  editBenefitModalVisible: boolean;
  editBenefitModalLoading: boolean;
  currentRowData: IBenefit;
  addBenefitModalVisible: boolean;
  addBenefitModalLoading: boolean;
  viewMode: boolean;
}

const BenefitPage = () => {
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const initialState = {
    benefitList: [] as IBenefit[],
    editBenefitModalVisible: false,
    editBenefitModalLoading: false,
    currentRowData: {} as IBenefit,
    addBenefitModalVisible: false,
    addBenefitModalLoading: false,
    viewMode: false,
  };

  const [benefitPageState, setBenefitPageState] =
    useState<BenefitPageState>(initialState);

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

  const {
    benefitList,
    addBenefitModalVisible,
    addBenefitModalLoading,
    currentRowData,
    editBenefitModalVisible,
    editBenefitModalLoading,
    viewMode,
  } = benefitPageState;

  const getBenefitList = async (params: QueryParams = {}) => {
    getBenefits(params).then(res => {
      if (res) {
        setBenefitPageState({
          benefitList: res.rows,
          currentRowData: {} as IBenefit,
          addBenefitModalVisible: false,
          addBenefitModalLoading: false,
          editBenefitModalLoading: false,
          editBenefitModalVisible: false,
          viewMode: false,
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
  useEffect(() => {
    getBenefitList({ pagination });
  }, []);

  const handleAddBenefit = () => {
    setBenefitPageState({ ...benefitPageState, addBenefitModalVisible: true });
  };

  const handleAddBenefitOK = () => {
    formAdd.validateFields().then(() => {
      const fieldValue = formAdd.getFieldsValue();
      fieldValue.benefitCode = fieldValue.benefitCode.trim();
      setBenefitPageState({
        ...benefitPageState,
        addBenefitModalLoading: true,
      });
      addBenefit(fieldValue)
        .then(res => {
          formAdd.resetFields();
          getBenefitList({ pagination });
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
          setBenefitPageState({
            ...benefitPageState,
            addBenefitModalLoading: false,
          });
        });
    });
  };

  const handleEditBenefit = (row: IBenefit) => {
    setBenefitPageState({
      ...benefitPageState,
      editBenefitModalVisible: true,
      currentRowData: { ...row },
      viewMode: false,
    });
  };

  const handleEditBenefitOK = () => {
    if (viewMode) {
      setBenefitPageState({
        ...benefitPageState,
        viewMode: false,
      });
      return;
    }
    formEdit.validateFields().then(() => {
      const fieldValue = formEdit.getFieldsValue();
      setBenefitPageState({
        ...benefitPageState,
        editBenefitModalLoading: true,
        currentRowData: fieldValue,
      });
      const value = {
        ...fieldValue,
        benefitNo: currentRowData.benefitNo,
      };

      formEdit.resetFields();
      updateBenefit(value).then(res => {
        getBenefitList({ pagination });
      });
    });
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getBenefitList({ pagination: newPagination, key });
  };

  const onSearch = (value: string) => {
    setKey(value);
    getBenefitList({ pagination, key: value });
  };

  const handleDeleteBenefit = async (benefitNo: number) => {
    await deleteBenefit(benefitNo);
    getBenefitList({ pagination });
  };

  const title = (
    <Space
      direction="horizontal"
      style={{ justifyContent: 'space-between', width: '100%' }}
    >
      <span>
        <Button size="large" type="primary" onClick={handleAddBenefit}>
          Thêm Quyền Lợi
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
    setBenefitPageState({
      ...benefitPageState,
      addBenefitModalVisible: false,
      editBenefitModalVisible: false,
      currentRowData: {} as IBenefit,
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
                setBenefitPageState({
                  ...benefitPageState,
                  editBenefitModalVisible: true,
                  viewMode: true,
                  currentRowData: record,
                });
              },
            };
          }}
          bordered
          rowKey="benefitNo"
          dataSource={benefitList}
          pagination={pagination}
          onChange={handleTableChange}
        >
          <Column
            title="Mã quyền lợi"
            dataIndex="benefitCode"
            key="benefitCode"
            align="center"
          />
          <Column
            title="Tên quyền lợi"
            dataIndex="benefitName"
            key="benefitName"
            align="center"
          />
          <Column
            title="Thao tác"
            key="action"
            align="center"
            render={(text, row: IBenefit) => (
              <span>
                <EditTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleEditBenefit(row);
                  }}
                />
                <Divider type="vertical" />
                <DeleteTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleDeleteBenefit(row.benefitNo);
                  }}
                />
              </span>
            )}
          />
        </Table>
      </Card>
      <EditBenefitForm
        viewMode={viewMode}
        currentRowData={currentRowData}
        form={formEdit}
        visible={editBenefitModalVisible}
        confirmLoading={editBenefitModalLoading}
        onCancel={handleCancel}
        onOk={handleEditBenefitOK}
      />
      <AddBenefitForm
        form={formAdd}
        visible={addBenefitModalVisible}
        confirmLoading={addBenefitModalLoading}
        onCancel={handleCancel}
        onOk={handleAddBenefitOK}
      />
    </div>
  );
};

export default BenefitPage;
