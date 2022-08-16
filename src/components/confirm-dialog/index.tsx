import { Modal } from 'antd';

interface IConfirmDialogProps {
  title: string;
  content: string;
  onOK: () => void;
  onCancel: () => void;
  visible: boolean;
}

const ConfirmDialog = ({
  onOK,
  onCancel,
  title,
  content,
  visible,
}: IConfirmDialogProps) => {
  return (
    <Modal
      cancelText="Hủy"
      okText="Đồng ý"
      maskClosable={false}
      title={title}
      centered
      visible={visible}
      onOk={onOK}
      onCancel={onCancel}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ConfirmDialog;
