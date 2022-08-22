import { Button, Card, Empty, Form, Result, Space, Steps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { ResultStatusType } from 'antd/lib/result';
import { useAppSelector } from 'app/hooks';
import Loading from 'components/loading';
import STATUS from 'constants/claim-status';
import DateFormat from 'constants/date-format';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import { IUser } from 'features/authentication/types';
import _ from 'lodash';
import { IBenefitDTOS } from 'models/benefit/types';
import { ILicense } from 'models/license/types';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getBenefitsByMember } from 'services/benefit.service';
import {
  getDetailClaim,
  saveDraftClaimByMember,
  submitClaimByMember,
} from 'services/claim.service';
import { getLicensesByBenefit } from 'services/license.service';
import BenefitClaim from './benefits/index';
import Detail from './detail';
import Summary from './summary';
import Term from './terms/index';
import { IClaim } from 'pages/claim/types';
import { openNotificationWithIcon } from 'components/notification';
import moment from 'moment';
import { IClaimDocumentResponseDTO } from 'models/claim/types';
import { NOT_ACCEPTABLE } from 'constants/http-status';
import { callbackify } from 'util';

const { Step } = Steps;

const CreateClaimPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const user = useAppSelector(selectCurrentUser) as IUser;
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState<{
    status: ResultStatusType | undefined;
    flag: boolean;
    title: string;
    description: string;
  }>({
    status: undefined,
    flag: false,
    title: '',
    description: '',
  });
  const [benefitList, setBenefitList] = useState<IBenefitDTOS[]>([]);
  const [licenseList, setLicenseList] = useState<ILicense[]>([]);
  const [filesList, setFilesList] = useState<UploadFile<any>[][]>([]);
  const [claim, setClaim] = useState<IClaim>({} as IClaim);

  const getLicenseList = async (benefitNo: number) => {
    setLoading(true);
    getLicensesByBenefit(benefitNo)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          setLicenseList(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getBenefitList = async (memberNo: number) => {
    setLoading(true);
    getBenefitsByMember(memberNo)
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          setBenefitList(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getClaim = async (claimNo: number) => {
    setLoading(true);
    getDetailClaim(claimNo)
      .then(async res => {
        if (res) {
          if (
            _.isEmpty(res) ||
            res.statusCode !== STATUS.DRAFT.key ||
            res.memberNo !== user.primary_key
          ) {
            await openNotificationWithIcon(
              'error',
              'Yêu cầu bồi thường không thể hiển thị',
              'Yêu cầu bồi thường không tồn tại hoặc người dùng không có quyền xem/sửa',
              'top',
            );
            navigate(-1);
            return;
          }
          setClaim(res);
          setCurrent(1);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const steps = useMemo(() => {
    return [
      {
        title: 'Điều khoản và điều kiện',
        content: <Term />,
        description: '',
        icon: '',
      },
      {
        title: 'Chi tiết điều trị',
        content: <BenefitClaim benefits={benefitList} claim={claim} />,
        fields: ['benefitNo', 'medicalAddress', 'visitDate', 'claimAmount'],
        description: '',
        icon: '',
      },
      {
        title: 'Tải hình ảnh chứng từ',
        content: (
          <Detail
            licenses={licenseList}
            form={form}
            filesList={filesList}
            setFilesList={setFilesList}
          />
        ),
        fields: [...licenseList.map(license => license.licenseNo.toString())],
        description: '',
        icon: '',
      },
      {
        title: 'Tóm tắt hồ sơ',
        content: <Summary form={form} benefits={benefitList} />,
        description: '',
        icon: '',
      },
    ];
  }, [benefitList, filesList, form, licenseList]);

  const initialValue = useMemo(() => {
    if (_.isEmpty(claim)) return {};
    const claimDocuments = claim.claimDocumentResponseDTOS;
    const files = [] as UploadFile<any>[][];

    claimDocuments.forEach((claimDocument, index) => {
      // form.setFields([
      //   {
      //     name: `${claimDocument.licenseResponseDTO.licenseNo.toString()}`,
      //     value: new File(),
      //   },
      // ]);
      files.push([
        {
          uid: `${index}`,
          name: `${claimDocument.originalFileName}`,
          status: 'done',
          url: `${claimDocument.fileUrl}`,
          thumbUrl: `${claimDocument.fileUrl}`,
        },
      ]);
    });

    setFilesList(files);

    const res = {
      benefitNo: claim.benefitNo,
      medicalAddress: claim.medicalAddress || undefined,
      description: claim.description || undefined,
      claimAmount: claim.claimAmount,
      visitDate: moment(claim.visitDate, DateFormat.DDMMYYYY),
    } as any;

    if (
      !_.isEmpty(claim.admissionFromDate) &&
      !_.isEmpty(claim.admissionToDate)
    ) {
      res.timeRange = [
        moment(claim.admissionFromDate, DateFormat.DDMMYYYY),
        moment(claim.admissionToDate, DateFormat.DDMMYYYY),
      ];
    }

    return res;
  }, [claim]);

  useEffect(() => {
    if (params.claimNo && _.isNumber(Number(params.claimNo))) {
      getClaim(Number(params.claimNo));
    }
  }, [params.claimNo]);

  useEffect(() => {
    if (user?.primary_key && _.isNumber(user?.primary_key)) {
      getBenefitList(user?.primary_key);
    }
  }, [user?.primary_key]);

  const saveDraft = (formData: FormData) => {
    saveDraftClaimByMember(formData)
      .then(res => {
        setShowResult({
          status: 'success',
          flag: true,
          title: 'Lưu thành công',
          description:
            'Bản nháp yêu cầu giải quyết quyền lợi bảo hiểm của Quý khách đã được lưu.',
        });
      })
      .catch(e => {
        setShowResult({
          status: 'error',
          flag: true,
          title: 'Lưu thất bại',
          description:
            'Xảy ra lỗi trong quá trình lưu bản nháp hồ sơ yêu cầu giải quyết quyền lợi.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const save = (formData: FormData) => {
    submitClaimByMember(formData)
      .then(res => {
        setShowResult({
          status: 'success',
          flag: true,
          title:
            'Yêu cầu giải quyết quyền lợi bảo hiểm của Quý khách đã được tiếp nhận',
          description:
            'Chúng tôi sẽ phản hồi sớm nhất có thể, làm phiền Quý khách chú ý thông báo/cuộc gọi của điện thoại cá nhân.',
        });
      })
      .catch(e => {
        setShowResult({
          status: 'error',
          flag: true,
          title:
            'Xảy ra lỗi trong quá trình nộp hồ sơ yêu cầu giải quyết quyền lợi',
          description:
            'Hãy thực hiện nộp hồ sơ lại, nếu vẫn xảy ra tình trạng tương tự, hãy quay lại nộp hồ sơ lúc khác.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const next = () => {
    form
      .validateFields(steps[current].fields)
      .then(() => {
        if (current === 1) {
          getLicenseList(form.getFieldValue('benefitNo'));
        }
        setCurrent(pre => pre + 1);
      })
      .catch(() => {});
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  if (_.isEmpty(benefitList)) {
    return (
      <div style={{ minHeight: 'calc(100vh - 104px)' }}>
        <div style={{ paddingTop: '30%' }}></div>
        <Empty description="Thành viên đang được đăng nhập không có quyền lợi nào hoặc quyền lợi đã hết hạn"></Empty>
      </div>
    );
  }

  const handleFinish = (callback: (formData: FormData) => void) => {
    setLoading(true);
    const fieldValue = form.getFieldsValue(true);
    const value = {
      ...fieldValue,
      memberNo: user.primary_key,
      licenseNos: licenseList.map(license => license.licenseNo),
      visitDate: fieldValue.visitDate
        .format(DateFormat.DDMMYYYY)
        .concat(' 00:00:00'),
    };

    if (params.claimNo) {
      value.claimNo = params.claimNo;
    }

    if (!_.isEmpty(fieldValue.timeRange)) {
      value.admissionFromDate = fieldValue?.timeRange[0]
        .format(DateFormat.DDMMYYYY)
        .concat(' 00:00:00');
      value.admissionToDate = fieldValue?.timeRange[1]
        .format(DateFormat.DDMMYYYY)
        .concat(' 00:00:00');
    }

    const formData = new FormData();
    delete value.timeRange;
    licenseList.forEach((license, index) => {
      if (!_.isEmpty(filesList[index][0].url)) {
        formData.append('documents', fieldValue[license.licenseNo.toString()]);
        delete value[license.licenseNo.toString()];
      }
    });
    formData.append(
      'claimSubmitRequestDTO',
      new Blob([JSON.stringify(value)], {
        type: 'application/json',
      }),
    );
    callback(formData);
  };

  return (
    <div className="app-container">
      <Card style={{ minHeight: 'calc(100vh - 104px)' }}>
        {loading && <Loading />}
        {!showResult.flag && !loading && (
          <Form
            initialValues={initialValue}
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Steps progressDot current={current}>
              {steps.map(item => (
                <Step
                  key={item.title}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </Steps>
            <div className="steps-content">
              <Space>{steps[current].content}</Space>
            </div>
            <div className="steps-action">
              {current === steps.length - 1 && (
                <span>
                  {current !== 0 && (
                    <Button
                      style={{ marginRight: '16px' }}
                      size="large"
                      type="ghost"
                      htmlType="submit"
                      onClick={() => handleFinish(saveDraft)}
                    >
                      Lưu bản nháp
                    </Button>
                  )}

                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    onClick={() => {
                      handleFinish(save);
                    }}
                  >
                    Nộp hồ sơ
                  </Button>
                </span>
              )}
              {current < steps.length - 1 && (
                <span>
                  <Button size="large" type="primary" onClick={() => next()}>
                    Tiếp tục
                  </Button>
                </span>
              )}
              {current > 0 && (
                <Button
                  size="large"
                  style={{ margin: '0 8px' }}
                  onClick={() => prev()}
                >
                  Quay lại
                </Button>
              )}
            </div>
          </Form>
        )}
        {showResult.flag && !loading && (
          <Result
            status={showResult.status}
            title={showResult.title}
            subTitle={showResult.description}
            extra={[
              <Button size="large" type="primary" key="console">
                Về trang chủ
              </Button>,
            ]}
          />
        )}
      </Card>
    </div>
  );
};

export default CreateClaimPage;
