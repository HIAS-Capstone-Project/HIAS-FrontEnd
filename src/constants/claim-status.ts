const STATUS = {
  DRAFT: { key: 'DRA', value: '' },
  CANCELED: { key: 'CXL', value: '' },
  SUBMITTED: { key: 'SUB', value: '' },
  BUSINESS_VERIFIED: { key: 'BV', value: '' },
  BUSINESS_VERIFYING: { key: 'BVY', value: '' },
  MEDICAL_VERIFIED: { key: 'MV', value: '' },
  MEDICAL_VERIFYING: { key: 'MVY', value: '' },
  WAITING_FOR_APPROVAL: { key: 'WFA', value: '' },
  APPROVED: { key: 'APR', value: '' },
  PAYMENT_PROCESSING: { key: 'PAY', value: '' },
  SETTLED: { key: 'SET', value: '' },
  REJECTED: { key: 'REJ', value: '' },
  RETURN: { key: 'RET', value: '' },
};

export default STATUS;
