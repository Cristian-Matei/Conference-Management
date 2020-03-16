package com.ubb.scalability.conference.security.oauth2.user;

import com.ubb.scalability.conference.model.Role;

import java.util.List;
import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getFirstName() {
        return (String) attributes.get("firstName");
    }

    @Override
    public String getLastName() {
        return (String) attributes.get("lastName");
    }


    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getAffiliation() {
        return (String) attributes.get("affiliation");
    }

    @Override
    public List<Role> getRoles() {
        return getRolesFromJson((String) attributes.get("roles"));
    }
}