import { EditTwoTone } from '@ant-design/icons';
import { Card, Input, Space, Table, TablePaginationConfig } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'components/loading';
import DateFormat from 'constants/date-format';
import { selectLayout, showLoading } from 'features/layout/layoutSlice';
import _ from 'lodash';
import moment from 'moment';
import { IClaim, QueryParams } from 'pages/claim/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getClaims, getDetailClaim } from 'services/claim.service';
import DetailClaim from './DetailClaim';

const { Column } = Table;

interface IClaimPageState {
  claimList: IClaim[];
  currentRowData: IClaim;
  deleteModelVisible: boolean;
}

const ManageClaim = () => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(selectLayout);
  const initialState = {
    claimList: [] as IClaim[],
    currentRowData: {} as IClaim,
    deleteModelVisible: false,
  };

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

  const { claimList, currentRowData } = claimPageState;
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

  useEffect(() => {}, [claimNo]);

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
                title="Lần cuổi sửa đổi"
                dataIndex="lastModified"
                key="lastModified"
                align="center"
              />
              <Column
                title="Thao tác"
                key="action"
                align="center"
                render={(text, row: IClaim) => (
                  <span>
                    <EditTwoTone
                      style={{ fontSize: '150%' }}
                      // onClick={(e: MouseEvent) => {
                      //   e.stopPropagation();
                      //   console.log('row: ', row);
                      //   // handleEditMember(row);
                      //   setClaimPageState({ ...claimPageState });
                      // }}
                    />
                    {/* <Divider type="vertical" />
                    <DeleteTwoTone
                      style={{ fontSize: '150%' }}
                      // onClick={(e: MouseEvent) => {
                      //   e.stopPropagation();
                      //   console.log('row: ', row);
                      // }}
                    /> */}
                  </span>
                )}
              />
            </Table>
          </Card>
          {!_.isEmpty(claim) && <DetailClaim ref={ref} claim={claim} />}
        </div>
      )}
    </>
  );
};

export default ManageClaim;
