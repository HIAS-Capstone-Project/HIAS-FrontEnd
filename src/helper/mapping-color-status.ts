import STATUS from 'constants/claim-status';

export const mappingColorStatus = (statusCode: string) => {
  switch (statusCode) {
    case STATUS.DRAFT.key:
      return '#bfbfbf';
    case STATUS.CANCELED.key:
      return '#f5222d';
    case STATUS.SUBMITTED.key:
      return '#d9f7be';
    case STATUS.BUSINESS_VERIFIED.key:
      return '#95de64';
    case STATUS.BUSINESS_VERIFYING.key:
      return '#b7eb8f';
    case STATUS.MEDICAL_VERIFIED.key:
      return '#52c41a';
    case STATUS.MEDICAL_VERIFYING.key:
      return '#73d13d';
    case STATUS.WAITING_FOR_APPROVAL.key:
      return '#389e0d';
    case STATUS.APPROVED.key:
      return '#237804';
    case STATUS.PAYMENT_PROCESSING.key:
      return '#135200';
    case STATUS.SETTLED.key:
      return '#092b00';
    case STATUS.REJECTED.key:
      return '#f5222d';
    case STATUS.RETURN.key:
      return '#13c2c2';
    default:
      return '#1890ff';
  }
};
