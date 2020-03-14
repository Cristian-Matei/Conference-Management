package com.ubb.scalability.conference.security.oauth2.user;

import java.util.Map;

public class FacebookOAuth2UserInfo extends OAuth2UserInfo {
    public FacebookOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getName() {
        return (String) attributes.get("firstName") + " " + attributes.get("lastName");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

}