export interface ILoginResponse {
  access_token?: string;
  expiry_date?: string;
  have_not_permission?: boolean;
  role?: string;
  token_type?: string;
  primary_key?: number;
}
