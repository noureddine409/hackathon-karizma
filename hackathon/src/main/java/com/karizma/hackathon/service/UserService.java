package com.karizma.hackathon.service;

import com.karizma.hackathon.model.User;

public interface UserService extends GenericService<User> {

    User findByEmail(String email);
}
