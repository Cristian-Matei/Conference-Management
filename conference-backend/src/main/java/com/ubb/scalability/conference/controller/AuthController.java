package com.ubb.scalability.conference.controller;


import com.ubb.scalability.conference.exception.BadRequestException;
import com.ubb.scalability.conference.model.Role;
import com.ubb.scalability.conference.model.User;
import com.ubb.scalability.conference.payload.ApiResponse;
import com.ubb.scalability.conference.payload.AuthResponse;
import com.ubb.scalability.conference.payload.LoginRequest;
import com.ubb.scalability.conference.payload.SignUpRequest;
import com.ubb.scalability.conference.repository.RoleRepository;
import com.ubb.scalability.conference.repository.UserRepository;
import com.ubb.scalability.conference.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RoleRepository roleRepository;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider, RoleRepository roleRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        String token = tokenProvider.createToken(authentication);
        if (userOptional.isPresent()) {
            List<Role> roles = new ArrayList<>(userOptional.get().getRoles());
            return ResponseEntity.ok(new AuthResponse(token, roles));
        }
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        // Creating user's account
        User user = new User();
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setAffiliation(signUpRequest.getAffiliation());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        List<Role> roles = signUpRequest.getRoles().stream()
                .map(r -> roleRepository.findByRoleName(r.getRoleName())).collect(Collectors.toList());
        user.setRoles(roles);
        User result = userRepository.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully@"));
    }


}