import { ILoginResponse } from 'models';

export type IUser = {
  isLogined: boolean;
} & ILoginResponse;

export default {};
