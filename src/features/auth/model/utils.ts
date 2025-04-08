import { ServerUser, User } from './User';

export const convertUserToServerUser = (user: User): ServerUser => {
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
    uid: uid,
    email: email,
    first_name: firstName ?? undefined,
    last_name: lastName ?? undefined,
    nickname: nickname ?? undefined,
    is_staff: String(isStaff),
    is_superuser: String(isSuperuser),
    joined_at: joinedAt ? joinedAt.toISOString() : undefined,
    left_at: leftAt ? leftAt.toISOString() : undefined,
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
    uid, // required on update
    email, // required on update
    firstName: first_name ?? undefined,
    lastName: last_name ?? undefined,
    nickname: nickname ?? undefined,
    isStaff: is_staff === 'true', // required on update
    isSuperuser: is_superuser === 'true', // required on update
    joinedAt: joined_at ? new Date(joined_at) : undefined,
    leftAt: left_at ? new Date(left_at) : undefined,
  };
};
