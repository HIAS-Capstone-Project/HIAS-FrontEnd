import { InboxOutlined } from '@ant-design/icons';
import { Upload, UploadFile, UploadProps } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  maxCount: 5,
  listType: 'picture',
  name: 'file',
  openFileDialogOnClick: true,
};

interface IUploadFile {
  accept: string;
  fileList?: UploadFile<any>[];
  beforeUpload: (file: UploadFile) => boolean;
  onChange: (info: any) => void;
}

const UploadComponent = ({
  accept,
  fileList,
  beforeUpload,
  onChange,
}: IUploadFile) => {
  return (
    <Dragger
      {...props}
      multiple
      accept={accept}
      fileList={fileList}
      beforeUpload={beforeUpload}
      onChange={onChange}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Chọn hoặc kéo thả file vào vùng này để tải file lên
      </p>
    </Dragger>
  );
};

export default UploadComponent;
