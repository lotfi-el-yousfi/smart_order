package com.lotfi.user;

import com.lotfi.user.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAll();
    UserDto create(UserDto dto);
}
