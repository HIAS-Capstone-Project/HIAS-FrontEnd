const STATUS = {
  DRAFT: { key: 'DRA', value: 'Nháp' },
  CANCELED: { key: 'CXL', value: 'Hủy bỏ' },
  SUBMITTED: { key: 'SUB', value: 'Đã nộp' },
  BUSINESS_VERIFIED: { key: 'BV', value: 'Đã kiểm chứng nghiệp vụ' },
  BUSINESS_VERIFYING: { key: 'BVY', value: 'Đang kiểm chứng nghiệp vụ' },
  MEDICAL_VERIFIED: { key: 'MV', value: 'Đã kiểm chứng y tế' },
  MEDICAL_VERIFYING: { key: 'MVY', value: 'Đang kiểm chứng y tế' },
  WAITING_FOR_APPROVAL: { key: 'WFA', value: 'Đang chờ phê duyệt' },
  APPROVED: { key: 'APR', value: 'Đã phê duyệt' },
  PAYMENT_PROCESSING: { key: 'PAY', value: 'Đang chờ thanh toán' },
  SETTLED: { key: 'SET', value: 'Đã thanh toán' },
  REJECTED: { key: 'REJ', value: 'Từ chối' },
  RETURN: { key: 'RET', value: 'Trả lại' },
};

export const STATUS_LIST = [
  { key: 'DRA', value: 'Nháp' },
  { key: 'CXL', value: 'Hủy bỏ' },
  { key: 'SUB', value: 'Đã nộp' },
  { key: 'BV', value: 'Đã kiểm chứng nghiệp vụ' },
  { key: 'BVY', value: 'Đang kiểm chứng nghiệp vụ' },
  { key: 'MV', value: 'Đã kiểm chứng y tế' },
  { key: 'MVY', value: 'Đang kiểm chứng y tế' },
  { key: 'WFA', value: 'Đang chờ phê duyệt' },
  { key: 'APR', value: 'Đã phê duyệt' },
  { key: 'PAY', value: 'Đang chờ thanh toán' },
  { key: 'SET', value: 'Đã thanh toán' },
  { key: 'REJ', value: 'Từ chối' },
  { key: 'RET', value: 'Trả lại' },
];

export default STATUS;
