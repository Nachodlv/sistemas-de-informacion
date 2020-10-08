package com.group3.infsys.service;

import com.group3.infsys.model.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserService {

    User addUser(User user);

    Optional<User> getUser(long id);

    boolean deleteUser(long id);
}
