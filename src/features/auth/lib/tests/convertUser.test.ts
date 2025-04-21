    expect(user.joinedAt?.getTime()).toBe(new Date(serverUser.joined_at).getTime());
    expect(user.leftAt?.getTime()).toBe(new Date(serverUser.left_at).getTime());