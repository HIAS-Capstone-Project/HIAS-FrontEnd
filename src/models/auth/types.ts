export interface ILoginResponse {
  access_token?: string;
  expiry_date?: string;
  have_not_permission?: boolean;
  roles?: [];
  token_type?: string;
}
