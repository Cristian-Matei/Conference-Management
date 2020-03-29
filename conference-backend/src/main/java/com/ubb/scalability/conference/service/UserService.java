package com.ubb.scalability.conference.service;

import com.ubb.scalability.conference.model.Role;
import com.ubb.scalability.conference.model.User;
import com.ubb.scalability.conference.payload.AuthResponse;
import com.ubb.scalability.conference.payload.LoginRequest;
import com.ubb.scalability.conference.payload.SignUpRequest;
import com.ubb.scalability.conference.repository.RoleRepository;
import com.ubb.scalability.conference.repository.UserRepository;
import com.ubb.scalability.conference.security.TokenProvider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private ModelMapper modelMapper;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private TokenProvider tokenProvider;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User getUser(int id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElseGet(User::new);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElseGet(User::new);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User getUserSignUp(SignUpRequest signUpRequest) {
        User user = modelMapper.map(signUpRequest, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<Role> roles = signUpRequest.getRoles().stream()
                .map(r -> roleRepository.findByRoleName(r.getRoleName())).collect(Collectors.toList());
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public AuthResponse authenticateByLoginRequest(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = findByEmail(loginRequest.getEmail());
        String token = tokenProvider.createToken(authentication);
        List<Role> roles = new ArrayList<>(user.getRoles());
        return new AuthResponse(token, roles, user.getId());
    }
}
