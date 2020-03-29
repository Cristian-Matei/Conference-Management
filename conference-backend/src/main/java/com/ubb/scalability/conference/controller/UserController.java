package com.ubb.scalability.conference.controller;

import com.ubb.scalability.conference.model.User;
import com.ubb.scalability.conference.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="conference/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void saveUsers(@RequestBody User user) {
        userService.saveUser(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUsers(@PathVariable("id") int id) {
        return userService.getUser(id);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public void deleteUsers(@PathVariable("id") int id) {
        userService.deleteUser(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

}
