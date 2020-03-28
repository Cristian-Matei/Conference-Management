package com.ubb.scalability.conference.payload;

import com.ubb.scalability.conference.model.Role;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class SignUpRequest {

    private String firstName;
    private String lastName;
    @Email
    private String email;
    private String password;
    private String affiliation;
    private List<Role> roles;
}