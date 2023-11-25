package com.karizma.hackathon.service.impl;

import com.karizma.hackathon.common.CoreConstant;
import com.karizma.hackathon.exception.ElementAlreadyExistsException;
import com.karizma.hackathon.exception.ElementNotFoundException;
import com.karizma.hackathon.model.User;
import com.karizma.hackathon.repository.GenericRepository;
import com.karizma.hackathon.repository.UserRepository;
import com.karizma.hackathon.service.UserService;
import com.karizma.hackathon.utils.MapHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.karizma.hackathon.common.CoreConstant.Exception.ALREADY_EXISTS;

@Service
public class UserServiceImpl extends GenericServiceImpl<User> implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(GenericRepository<User> genericRepository, MapHelper mapHelper, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        super(genericRepository, mapHelper);
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findByEmail(String email) throws ElementNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) return user.get();
        throw new ElementNotFoundException(null, new ElementNotFoundException(), CoreConstant.Exception.NOT_FOUND, new Object[]{email});
    }

    @Override
    public User save(User user) throws ElementAlreadyExistsException {
        if (userRepository.findByEmail(user.getEmail()).isPresent())
            throw new ElementAlreadyExistsException(null, new ElementAlreadyExistsException(), ALREADY_EXISTS,
                    new Object[]{user.getEmail()});

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return super.save(user);
    }


}
