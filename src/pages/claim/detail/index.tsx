import { Card, Form, FormInstance, Space, Typography } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import UploadFileComponent from 'components/upload-file';
import _ from 'lodash';
import { ILicense } from 'models/license/types';

const { Title } = Typography;

interface IDetailProps {
  form: FormInstance;
  licenses: ILicense[];
  filesList: UploadFile<any>[][];
  setFilesList: React.Dispatch<React.SetStateAction<UploadFile<any>[][]>>;
}

const Detail = (props: IDetailProps) => {
  const { licenses, filesList, setFilesList, form } = props;
  return (
    <Space>
      <Card style={{ minHeight: '70vh' }} bordered={false}>
        <Title level={2}>Tải hình ảnh chứng từ</Title>
        <Space
          direction="vertical"
          style={{
            minWidth: '960px',
            paddingLeft: '20px',
            marginTop: '1.2rem',
          }}
        >
          {licenses.map((license, index) => {
            const fileList = !_.isEmpty(filesList[index])
              ? filesList[index]
              : [];

            return (
              <Form.Item
                key={license.licenseNo.toString()}
                name={license.licenseNo.toString()}
                label={`${license.label}:`}
                required
                rules={[
                  {
                    validator: (dump, value) => {
                      if (
                        typeof value === 'object' &&
                        !_.isEmpty(value.fileList)
                      ) {
                        return Promise.resolve();
                      } else if (
                        value &&
                        value.name &&
                        typeof value.name === 'string'
                      ) {
                        return Promise.resolve();
                      } else if (_.isEmpty(value) && !_.isEmpty(fileList)) {
                        return Promise.resolve();
                      }
                      return Promise.reject();
                    },
                    message: 'Hãy tải lên hình ảnh chứng từ',
                  },
                ]}
              >
                <UploadFileComponent
                  fileList={[...fileList]}
                  accept="image/*,.pdf"
                  onRemove={(fileRemove: UploadFile) => {
                    const newFilesList = _.cloneDeep(
                      filesList,
                    ) as UploadFile<any>[][];
                    newFilesList[index] = [];
                    setFilesList([...newFilesList]);
                  }}
                  beforeUpload={(file: UploadFile) => {
                    const newFilesList = _.cloneDeep(
                      filesList,
                    ) as UploadFile<any>[][];
                    newFilesList[index] = [file];
                    setFilesList([...newFilesList]);
                    return false;
                  }}
                  onChange={(info: any) => {
                    if (
                      info.file.status !== 'removed' &&
                      !_.isEmpty(info.fileList)
                    ) {
                      form.setFields([
                        {
                          name: license.licenseNo.toString(),
                          errors: [],
                          value: info.file,
                        },
                      ]);
                    }
                  }}
                />
              </Form.Item>
            );
          })}
        </Space>
      </Card>
    </Space>
  );
};

export default Detail;
