package com.ubb.scalability.conference.security.oauth2.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ubb.scalability.conference.model.Role;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getId();

    public abstract String getFirstName();

    public abstract String getLastName();

    public abstract String getEmail();

    public abstract String getAffiliation();

    public abstract List<Role> getRoles();

    static List<Role> getRolesFromJson(String roles2) {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Role> roles = new ArrayList<>();
        try {
            JsonNode jsonNode = objectMapper.readTree(roles2);
            for (JsonNode next : jsonNode) {
                Role role = new Role();
                role.setRoleName(next.get("roleName").asText());
                roles.add(role);
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return roles;
    }
}