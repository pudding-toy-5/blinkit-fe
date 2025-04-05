export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  isStaff: boolean;
  isSuperuser: boolean;
  joinedAt: Date;
  leftAt: Date;
}

export interface ServerUser {
  uid: string;
  email: string;
  first_name: string;
  last_name: string;
  nickname: string;
  is_staff: string;
  is_superuser: string;
  joined_at: string;
  left_at: string;
}
