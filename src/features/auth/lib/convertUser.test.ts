import { describe, it } from 'vitest';

import { ServerUser, User } from '@/features/auth/model/User';

import { fromUser, toUser } from './convertUser';

describe('fromUser', () => {
  const providedUser: User = {
    uid: 'uid',
    email: 'email',
    firstName: undefined,
    lastName: undefined,
    nickname: undefined,
    isStaff: false,
    isSuperuser: false,
    joinedAt: undefined,
    leftAt: undefined,
  };

  it('converts correct user uid and email.', () => {
    const user: User = { ...providedUser };
    const serverUser: ServerUser = fromUser(user);

    expect(serverUser.uid).toBe(user.uid);
    expect(serverUser.email).toBe(user.email);
  });

  it('converts correct optional properties.', () => {
    const user: User = {
      ...providedUser,
      firstName: undefined,
      lastName: undefined,
      nickname: undefined,
      joinedAt: undefined,
      leftAt: undefined,
    };
    const serverUser: ServerUser = fromUser(user);

    expect(serverUser.first_name).toBe(user.firstName);
    expect(serverUser.last_name).toBe(user.lastName);
    expect(serverUser.nickname).toBe(user.nickname);
    expect(serverUser.joined_at).toBe(user.joinedAt);
    expect(serverUser.left_at).toBe(user.leftAt);
  });

  it('converts boolean properties to string.', () => {
    const user: User = { ...providedUser };
    const serverUser: ServerUser = fromUser(user);

    expect(serverUser.is_staff).toBe(String(user.isStaff));
    expect(serverUser.is_superuser).toBe(String(user.isSuperuser));
  });

  it('converts date properties to ISOString.', () => {
    const user: User = {
      ...providedUser,
      joinedAt: new Date(),
      leftAt: new Date(),
    };
    const serverUser: ServerUser = fromUser(user);

    expect(serverUser.joined_at).not.toBe(undefined);
    expect(serverUser.left_at).not.toBe(undefined);

    if (user.joinedAt) {
      expect(serverUser.joined_at).toBe(user.joinedAt.toISOString());
    }

    if (user.leftAt) {
      expect(serverUser.left_at).toBe(user.leftAt.toISOString());
    }
  });
});

describe('toUser', () => {
  const providedServerUser: ServerUser = {
    uid: 'uid',
    email: 'email',
    first_name: undefined,
    last_name: undefined,
    nickname: undefined,
    is_staff: String(false),
    is_superuser: String(false),
    joined_at: undefined,
    left_at: undefined,
  };

  it('converts correct user uid and email.', () => {
    const serverUser: ServerUser = { ...providedServerUser };
    const user: User = toUser(serverUser);

    expect(user.uid).toBe(serverUser.uid);
    expect(user.email).toBe(serverUser.email);
  });

  it('converts correct optional properties.', () => {
    const serverUser: ServerUser = {
      ...providedServerUser,
      first_name: undefined,
      last_name: undefined,
      nickname: undefined,
      joined_at: undefined,
      left_at: undefined,
    };
    const user: User = toUser(serverUser);

    expect(user.firstName).toBe(serverUser.first_name);
    expect(user.lastName).toBe(serverUser.last_name);
    expect(user.nickname).toBe(serverUser.nickname);
    expect(user.joinedAt).toBe(serverUser.joined_at);
    expect(user.leftAt).toBe(serverUser.left_at);
  });

  it('converts boolean properties to string.', () => {
    const serverUser: ServerUser = { ...providedServerUser };
    const user: User = toUser(serverUser);

    expect(user.isStaff).toBe(Boolean(serverUser.is_staff));
    expect(user.isSuperuser).toBe(Boolean(serverUser.is_superuser));
  });

  it('converts ISOString properties to date.', () => {
    const serverUser: ServerUser = {
      ...providedServerUser,
      joined_at: new Date().toISOString(),
      left_at: new Date().toISOString(),
    };
    const user: User = toUser(serverUser);

    if (serverUser.joined_at) {
      expect(user.joinedAt).toBe(new Date(serverUser.joined_at));
    }

    if (serverUser.left_at) {
      expect(user.leftAt).toBe(new Date(serverUser.left_at));
    }
  });
});
