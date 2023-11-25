package com.karizma.hackathon.repository;

import com.karizma.hackathon.model.User;

import java.util.Optional;

public interface UserRepository extends GenericRepository<User> {

    Optional<User> findByEmail(String email);
}
