const links: any = {
  ROLE_SYSTEM_ADMIN: [
    {
      to: '/dashboard',
      name: 'Thống kê',
      readonly: false,
    },
    {
      to: '/claim',
      name: 'Yêu cầu bồi thường',
      readonly: false,
    },
    {
      to: '/member',
      name: 'Người tham gia bảo hiểm',
      readonly: false,
    },
    {
      to: '/employee',
      name: 'Nhân viên',
      readonly: false,
    },
    {
      to: '/client',
      name: 'Doanh nghiệp',
      readonly: false,
    },
    {
      to: '/policy',
      name: 'Chính sách',
      readonly: false,
    },
    {
      to: '/benefit',
      name: 'Quyền lợi',
      readonly: false,
    },
    {
      to: '/benefit-item',
      name: 'Danh mục quyền lợi',
      readonly: false,
    },
    {
      to: '/service-provider',
      name: 'Cơ sở khám chữa bệnh',
      readonly: false,
    },
  ],
  ROLE_CLIENT: [
    {
      to: '/dashboard',
      name: 'Thống kê',
      readonly: false,
    },
    {
      to: '/claim',
      name: 'Yêu cầu bồi thường',
      readonly: true,
    },
    {
      to: '/member',
      name: 'Người tham gia bảo hiểm',
      readonly: true,
    },
    {
      to: '/policy',
      name: 'Chính sách',
      readonly: true,
    },
    {
      to: '/benefit',
      name: 'Quyền lợi',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Danh mục quyền lợi',
      readonly: true,
    },
    {
      to: '/service-provider',
      name: 'Cơ sở khám chữa bệnh',
      readonly: true,
    },
  ],
  ROLE_SERVICE_PROVIDER: [
    {
      to: '/home',
      name: 'Trang chủ',
      readonly: false,
    },
    {
      to: '/claim',
      name: 'Yêu cầu bồi thường',
      readonly: false,
    },
    {
      to: '/benefit',
      name: 'Quyền lợi',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Danh mục quyền lợi',
      readonly: true,
    },
    {
      to: '/service-provider',
      name: 'Cơ sở khám chữa bệnh',
      readonly: true,
    },
  ],
  ROLE_BUSINESS_EMPLOYEE: [
    {
      to: '/dashboard',
      name: 'Thống kê',
      readonly: false,
    },
    {
      to: '/member',
      name: 'Người tham gia bảo hiểm',
      readonly: true,
    },
    {
      to: '/client',
      name: 'Doanh nghiệp',
      readonly: true,
    },
    {
      to: '/service-provider',
      name: 'Cơ sở khám chữa bệnh',
      readonly: true,
    },
  ],
  ROLE_MEMBER: [
    {
      to: '/home',
      name: 'Trang chủ',
      readonly: false,
    },
    {
      to: '/claim',
      name: 'Yêu cầu bồi thường',
      readonly: false,
    },
    {
      to: '/policy',
      name: 'Chính sách',
      readonly: true,
    },
    {
      to: '/benefit',
      name: 'Quyền lợi',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Danh mục quyền lợi',
      readonly: true,
    },
    {
      to: '/service-provider',
      name: 'Cơ sở khám chữa bệnh',
      readonly: true,
    },
  ],
  ROLE_HEALTH_MODERATOR: [
    {
      to: '/claim',
      name: 'Yêu cầu bồi thường',
      readonly: false,
    },
    {
      to: '/member',
      name: 'Người tham gia bảo hiểm',
      readonly: true,
    },
    {
      to: '/benefit',
      name: 'Quyền lợi',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Danh mục quyền lợi',
      readonly: true,
    },
    {
      to: '/service-provider',
      name: 'Cơ sở khám chữa bệnh',
      readonly: true,
    },
  ],
  ROLE_MEDICAL_APPRAISER: [
    {
      to: '/claim',
      name: 'Yêu cầu bồi thường',
      readonly: false,
    },
    {
      to: '/benefit',
      name: 'Quyền lợi',
      readonly: true,
    },
    {
      to: '/member',
      name: 'Người tham gia bảo hiểm',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Danh mục quyền lợi',
      readonly: true,
    },
    {
      to: '/service-provider',
      name: 'Cơ sở khám chữa bệnh',
      readonly: true,
    },
  ],
  ROLE_BUSINESS_APPRAISER: [
    {
      to: '/claim',
      name: 'Yêu cầu bồi thường',
      readonly: false,
    },
    {
      to: '/member',
      name: 'Người tham gia bảo hiểm',
      readonly: true,
    },
    {
      to: '/benefit',
      name: 'Quyền lợi',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Danh mục quyền lợi',
      readonly: true,
    },
    {
      to: '/service-provider',
      name: 'Cơ sở khám chữa bệnh',
      readonly: true,
    },
  ],
  ROLE_ACCOUNTANT: [
    {
      to: '/dashboard',
      name: 'Thống kê',
      readonly: false,
    },
    {
      to: '/claim',
      name: 'Yêu cầu bồi thường',
      readonly: false,
    },
    {
      to: '/member',
      name: 'Người tham gia bảo hiểm',
      readonly: true,
    },
    {
      to: '/client',
      name: 'Doanh nghiệp',
      readonly: true,
    },
    {
      to: '/benefit',
      name: 'Quyền lợi',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Danh mục quyền lợi',
      readonly: true,
    },
    {
      to: '/service-provider',
      name: 'Cơ sở khám chữa bệnh',
      readonly: true,
    },
  ],
};

export default links;
