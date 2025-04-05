import { ServerUser, User } from './User';

export const convertUserToServerUser = (user: Partial<User>): ServerUser => {
  const {
    uid,
    email,
    firstName,
    lastName,
    nickname,
    isStaff,
    isSuperuser,
    joinedAt,
    leftAt,
  } = user;

  return {
    uid: uid ?? '',
    email: email ?? '',
    first_name: firstName ?? '',
    last_name: lastName ?? '',
    nickname: nickname ?? '',
    is_staff: String(isStaff),
    is_superuser: String(isSuperuser),
    joined_at: joinedAt ? joinedAt.toISOString() : '',
    left_at: leftAt ? leftAt.toISOString() : '',
  };
};

export const convertServerUserToUser = (serverUser: ServerUser): User => {
  const {
    uid,
    email,
    first_name,
    last_name,
    nickname,
    is_staff,
    is_superuser,
    joined_at,
    left_at,
  } = serverUser;

  return {
    uid,
    email,
    firstName: first_name,
    lastName: last_name,
    nickname,
    isStaff: is_staff === 'true',
    isSuperuser: is_superuser === 'true',
    joinedAt: new Date(joined_at),
    leftAt: new Date(left_at),
  };
};
