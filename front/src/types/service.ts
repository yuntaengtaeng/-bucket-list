export interface ErrorData {
  message: string;
}

export interface UserInfo {
  nickname: string;
  accessToken: string;
  refreshTokenKey: string;
}

export interface CategoryList {
  id: string;
  name: string;
  icon: string;
}

export interface BucketData {
  categoryID: string;
  context: string;
  title: string;
  id: string;
  isChecked?: boolean;
}

export interface Count {
  total: number;
  notChecked: number;
  checked: number;
}
