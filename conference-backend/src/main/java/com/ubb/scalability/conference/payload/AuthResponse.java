package com.ubb.scalability.conference.payload;

import com.ubb.scalability.conference.model.Role;
import lombok.Data;

import java.util.List;

@Data
public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private List<Role> roles;
    private Integer userId;

    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public AuthResponse(String accessToken, List<Role> roles, Integer userId) {
        this.accessToken = accessToken;
        this.roles = roles;
        this.userId = userId;
    }

}