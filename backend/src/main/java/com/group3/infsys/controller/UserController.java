package com.group3.infsys.controller;

import com.group3.infsys.model.User;
import com.group3.infsys.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping()
    public User addUser(@RequestBody User user) {
        final Optional<User> optionalUser = userService.getUserByUsername(user.getUsername());
        if (optionalUser.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already in use");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.addUser(user);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") long id) {
        Optional<User> user = userService.getUser(id);
        if (user.isPresent()) return user.get();
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User Not Found");
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public boolean deleteUser(@PathVariable("id") long id) {
        return userService.deleteUser(id);
    }
}
