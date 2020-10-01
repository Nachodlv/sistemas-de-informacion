package com.group3.infsys.controller;

import com.group3.infsys.model.User;
import com.group3.infsys.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping()
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") long id) {
        Optional<User> user = userService.getUser(id);
        if (user.isPresent()) return user.get();
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User Not Found");
    }

    @DeleteMapping("/{id}")
    public boolean deleteUser(@PathVariable("id") long id) {
        return userService.deleteUser(id);
    }
}
