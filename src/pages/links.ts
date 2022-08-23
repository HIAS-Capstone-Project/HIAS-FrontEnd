const links: any = {
  ROLE_SYSTEM_ADMIN: [
    {
      to: '/dashboard',
      name: 'Dashboard',
      readonly: false,
    },
    {
      to: '/client',
      name: 'Manage Client',
      readonly: false,
    },
    {
      to: '/service-provider',
      name: 'Manage Service Provider',
      readonly: false,
    },
    {
      to: '/policy',
      name: 'Manage Policy',
      readonly: false,
    },
    {
      to: '/benefit',
      name: 'Manage Benefit',
      readonly: false,
    },
    {
      to: '/benefit-item',
      name: 'Manage Benefit Item',
      readonly: false,
    },
    {
      to: '/employee',
      name: 'Manage Employee',
      readonly: false,
    },
    {
      to: '/member',
      name: 'Manage Member',
      readonly: false,
    },
    {
      to: '/claim',
      name: 'Manage Claim',
      readonly: false,
    },
  ],
  ROLE_CLIENT: [
    {
      to: '/dashboard',
      name: 'Dashboard',
      readonly: false,
    },
    {
      to: '/service-provider',
      name: 'Manage Service Provider',
      readonly: true,
    },
    {
      to: '/policy',
      name: 'Manage Policy',
      readonly: true,
    },
    {
      to: '/benefit',
      name: 'Manage Benefit',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Manage Benefit Item',
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
      name: 'Manage Claim',
      readonly: false,
    },
  ],
  ROLE_BUSINESS_EMPLOYEE: [
    {
      to: '/dashboard',
      name: 'Dashboard',
      readonly: false,
    },
    {
      to: '/client',
      name: 'Manage Client',
      readonly: true,
    },
    {
      to: '/member',
      name: 'Manage Member',
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
      name: 'Manage Claim',
      readonly: false,
    },
    {
      to: '/policy',
      name: 'Manage Policy',
      readonly: true,
    },
    {
      to: '/service-provider',
      name: 'Manage Service Provider',
      readonly: true,
    },
    {
      to: '/benefit',
      name: 'Manage Benefit',
      readonly: false,
    },
    {
      to: '/benefit-item',
      name: 'Manage Benefit Item',
      readonly: false,
    },
  ],
  ROLE_HEALTH_MODERATOR: [
    {
      to: '/dashboard',
      name: 'Dashboard',
      readonly: false,
    },
    {
      to: '/claim',
      name: 'Manage Claim',
      readonly: false,
    },
    {
      to: '/benefit',
      name: 'Manage Benefit',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Manage Benefit Item',
      readonly: true,
    },
  ],
  ROLE_MEDICAL_APPRAISER: [
    {
      to: '/dashboard',
      name: 'Dashboard',
      readonly: false,
    },
    {
      to: '/claim',
      name: 'Manage Claim',
      readonly: false,
    },
    {
      to: '/benefit',
      name: 'Manage Benefit',
      readonly: false,
    },
    {
      to: '/benefit-item',
      name: 'Manage Benefit Item',
      readonly: false,
    },
  ],
  ROLE_BUSINESS_APPRAISER: [
    {
      to: '/dashboard',
      name: 'Dashboard',
      readonly: false,
    },
    {
      to: '/claim',
      name: 'Manage Claim',
      readonly: false,
    },
    {
      to: '/benefit',
      name: 'Manage Benefit',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Manage Benefit Item',
      readonly: true,
    },
  ],
  ROLE_ACCOUNTANT: [
    {
      to: '/dashboard',
      name: 'Dashboard',
      readonly: false,
    },
    {
      to: '/claim',
      name: 'Manage Claim',
      readonly: false,
    },
    {
      to: '/benefit',
      name: 'Manage Benefit',
      readonly: true,
    },
    {
      to: '/benefit-item',
      name: 'Manage Benefit Item',
      readonly: true,
    },
  ],
};

export default links;
