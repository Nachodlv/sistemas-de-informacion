package com.group3.infsys.service;

import com.group3.infsys.model.User;
import com.group3.infsys.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUser(long id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean deleteUser(long id) {
        boolean exists = userRepository.existsById(id);
        if (exists) userRepository.deleteById(id);
        return exists;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
