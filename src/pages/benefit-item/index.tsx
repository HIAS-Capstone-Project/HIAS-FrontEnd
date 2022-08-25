import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
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
import { useAppSelector } from 'app/hooks';
import ConfirmDialog from 'components/confirm-dialog';
import { openNotificationWithIcon } from 'components/notification';
import { NOT_ACCEPTABLE } from 'constants/http-status';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import _ from 'lodash';
import { IBenefit } from 'pages/benefit/types';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import {
  addBenefitItem,
  deleteBenefitItem,
  getBenefitItems,
  updateBenefitItem,
} from 'services/benefit.item.service';
import { getAllBenefit } from 'services/benefit.service';
import AddBenefitItemForm from './form/add-benefit-item-form';
import EditBenefitItemForm from './form/edit-benefit-item-form';
import { IBenefitItem, QueryParams } from './types';
import dashboardLinks from '../../pages/links';
const { Column } = Table;

interface IBenefitItemPageState {
  benefitItemList: IBenefitItem[];
  editBenefitItemModalVisible: boolean;
  editBenefitItemModalLoading: boolean;
  currentRowData: IBenefitItem;
  addBenefitItemModalVisible: boolean;
  addBenefitItemModalLoading: boolean;
  viewMode: boolean;
  deleteModelVisible: boolean;
}

const BenefitItemPage = () => {
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  const readonly = dashboardLinks[user.role].find((x: any) => {
    return x.to == location.pathname;
  }).readonly;

  const initialState = {
    benefitItemList: [] as IBenefitItem[],
    editBenefitItemModalVisible: false,
    editBenefitItemModalLoading: false,
    currentRowData: {} as IBenefitItem,
    addBenefitItemModalVisible: false,
    addBenefitItemModalLoading: false,
    viewMode: false,
    deleteModelVisible: false,
  };

  const [benefitItemPageState, setBenefitItemPageState] =
    useState<IBenefitItemPageState>(initialState);

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
  const [benefits, setBenefits] = useState<IBenefit[]>([]);

  const {
    benefitItemList,
    addBenefitItemModalVisible,
    addBenefitItemModalLoading,
    currentRowData,
    editBenefitItemModalVisible,
    editBenefitItemModalLoading,
    viewMode,
    deleteModelVisible,
  } = benefitItemPageState;

  const dataSource = useMemo(() => {
    return benefitItemList.map(benefitItem => {
      return {
        ...benefitItem,
        benefitName: benefits.find(
          item => item.benefitNo === benefitItem.benefitNo,
        )?.benefitName,
      };
    });
  }, [benefitItemList, benefits]);

  const getBenefitItemList = async (params: QueryParams = {}) => {
    getBenefitItems(params).then(res => {
      if (res) {
        setBenefitItemPageState({
          benefitItemList: res.rows,
          currentRowData: {} as IBenefitItem,
          addBenefitItemModalVisible: false,
          addBenefitItemModalLoading: false,
          editBenefitItemModalLoading: false,
          editBenefitItemModalVisible: false,
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

  const getBenefitList = async () => {
    getAllBenefit().then(res => {
      if (res) {
        if (_.isEmpty(res)) return;
        setBenefits(res);
      }
    });
  };

  useEffect(() => {
    getBenefitItemList({ pagination });
    getBenefitList();
  }, []);

  const handleAddBenefitItem = () => {
    setBenefitItemPageState({
      ...benefitItemPageState,
      addBenefitItemModalVisible: true,
    });
  };

  const handleAddBenefitItemOK = () => {
    formAdd.validateFields().then(() => {
      const fieldValue = formAdd.getFieldsValue();
      fieldValue.benefitItemCode = fieldValue.benefitItemCode.trim();
      setBenefitItemPageState({
        ...benefitItemPageState,
        addBenefitItemModalLoading: true,
      });
      addBenefitItem(fieldValue)
        .then(res => {
          formAdd.resetFields();
          openNotificationWithIcon(
            'success',
            'Thêm danh mục quyền lợi thành công',
            `Danh mục quyền lợi có mã ${fieldValue.benefitItemCode} đã được thêm mới`,
            'bottomLeft',
          );
          getBenefitItemList({ pagination });
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
          setBenefitItemPageState({
            ...benefitItemPageState,
            addBenefitItemModalLoading: false,
          });
        });
    });
    /** @TO_DO catch error after validate FE */
  };

  const handleEditBenefitItem = (row: IBenefitItem) => {
    setBenefitItemPageState({
      ...benefitItemPageState,
      editBenefitItemModalVisible: true,
      currentRowData: { ...row },
      viewMode: false,
    });
  };

  const handleEditBenefitItemOK = () => {
    if (viewMode) {
      setBenefitItemPageState({
        ...benefitItemPageState,
        viewMode: false,
      });
      return;
    }
    formEdit.validateFields().then(() => {
      const fieldValue = formEdit.getFieldsValue();
      setBenefitItemPageState({
        ...benefitItemPageState,
        editBenefitItemModalLoading: true,
        currentRowData: fieldValue,
      });
      const value = {
        ...fieldValue,
        benefitItemNo: currentRowData.benefitItemNo,
      };

      updateBenefitItem(value).then(res => {
        openNotificationWithIcon(
          'success',
          'Chỉnh sửa danh mục quyền lợi thành công',
          `Danh mục quyền lợi có mã ${currentRowData.benefitItemCode} đã được cập nhật`,
          'bottomLeft',
        );
        getBenefitItemList({ pagination });
      });
      formEdit.resetFields();
    });
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getBenefitItemList({ pagination: newPagination, key });
  };

  const onSearch = (value: string) => {
    setKey(value);
    getBenefitItemList({ pagination, key: value });
  };

  const handleDeleteBenefitItem = async (
    benefitItemNo: number,
    benefitItemCode: string,
  ) => {
    await deleteBenefitItem(benefitItemNo).then(() => {
      openNotificationWithIcon(
        'error',
        'Xóa danh mục quyền lợi thành công',
        `Danh mục quyền lợi có mã ${benefitItemCode} đã được xóa`,
        'bottomLeft',
      );
      getBenefitItemList({ pagination });
    });
  };

  const title = (
    <Space
      direction="horizontal"
      style={{ justifyContent: 'space-between', width: '100%' }}
    >
      <span>
        {!readonly && (
          <Button size="large" type="primary" onClick={handleAddBenefitItem}>
            Thêm Danh mục quyền lợi
          </Button>
        )}
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
    setBenefitItemPageState({
      ...benefitItemPageState,
      addBenefitItemModalVisible: false,
      editBenefitItemModalVisible: false,
      currentRowData: {} as IBenefitItem,
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
                setBenefitItemPageState({
                  ...benefitItemPageState,
                  editBenefitItemModalVisible: true,
                  viewMode: true,
                  currentRowData: record,
                });
              },
            };
          }}
          bordered
          rowKey="benefitItemNo"
          dataSource={dataSource}
          pagination={pagination}
          onChange={handleTableChange}
        >
          <Column
            title="Mã danh mục quyền lợi"
            dataIndex="benefitItemCode"
            key="benefitItemCode"
            align="center"
          />
          <Column
            title="Tên danh mục quyền lợi"
            dataIndex="benefitItemName"
            key="benefitItemName"
            align="center"
          />
          <Column
            title="Tên quyền lợi"
            dataIndex="benefitName"
            key="benefitName"
            align="center"
          />
          <Column
            title="Chi phí được bảo trợ"
            dataIndex="budgetAmount"
            key="budgetAmount"
            align="center"
            render={text =>
              `${text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ`
            }
          />
          {!readonly && (
            <Column
              title="Thao tác"
              key="action"
              align="center"
              render={(text, row: IBenefitItem) => (
                <span>
                  <EditTwoTone
                    style={{ fontSize: '200%' }}
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      handleEditBenefitItem(row);
                    }}
                  />
                  <Divider type="vertical" style={{ fontSize: '200%' }} />
                  <DeleteOutlined
                    style={{ fontSize: '200%', color: '#ff4d4f' }}
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      setBenefitItemPageState({
                        ...benefitItemPageState,
                        currentRowData: row,
                        deleteModelVisible: true,
                      });
                    }}
                  />
                </span>
              )}
            />
          )}
        </Table>
      </Card>
      <EditBenefitItemForm
        readonly={readonly}
        benefits={benefits}
        viewMode={viewMode}
        currentRowData={currentRowData}
        form={formEdit}
        visible={editBenefitItemModalVisible}
        confirmLoading={editBenefitItemModalLoading}
        onCancel={handleCancel}
        onOk={handleEditBenefitItemOK}
      />
      <AddBenefitItemForm
        benefits={benefits}
        form={formAdd}
        visible={addBenefitItemModalVisible}
        confirmLoading={addBenefitItemModalLoading}
        onCancel={handleCancel}
        onOk={handleAddBenefitItemOK}
      />
      <ConfirmDialog
        visible={deleteModelVisible}
        title="Xóa danh mục quyền lợi"
        content={`Bạn có đồng ý xóa danh mục quyền lợi ${currentRowData.benefitItemName} hay không?`}
        onOK={() =>
          handleDeleteBenefitItem(
            currentRowData.benefitItemNo,
            currentRowData.benefitItemCode,
          )
        }
        onCancel={() =>
          setBenefitItemPageState({
            ...benefitItemPageState,
            currentRowData: {} as IBenefitItem,
            deleteModelVisible: false,
          })
        }
      />
    </div>
  );
};

export default BenefitItemPage;
