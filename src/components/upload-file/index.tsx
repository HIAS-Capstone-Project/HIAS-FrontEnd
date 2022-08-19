import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import _ from 'lodash';

const { Dragger } = Upload;

const props: UploadProps = {
  listType: 'picture',
  name: 'file',
  multiple: false,
  openFileDialogOnClick: true,
};

interface IUploadFile {
  accept: string;
  disabled?: boolean;
  fileList?: UploadFile<any>[];
  onRemove: (file: UploadFile) => void;
  beforeUpload: (file: UploadFile) => boolean;
  onChange: (info: any) => void;
}

const UploadFileComponent = ({
  accept,
  disabled,
  fileList,
  onRemove,
  onChange,
  beforeUpload,
}: IUploadFile) => {
  const files = (!_.isEmpty(fileList) ? fileList : props.fileList) || [];
  return (
    <Dragger
      {...props}
      accept={accept}
      disabled={disabled}
      fileList={!_.isEmpty(files) ? [...files] : undefined}
      onRemove={onRemove}
      onChange={onChange}
      beforeUpload={beforeUpload}
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

export default UploadFileComponent;
