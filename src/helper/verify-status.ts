import STATUS from 'constants/claim-status';

export const isVerifyingStatus = (statusCode: string) => {
  if (
    [
      STATUS.BUSINESS_VERIFYING,
      STATUS.MEDICAL_VERIFYING,
      STATUS.PAYMENT_PROCESSING,
      STATUS.WAITING_FOR_APPROVAL,
    ].find(status => status.key === statusCode)
  )
    return true;
  return false;
};
export default {};
