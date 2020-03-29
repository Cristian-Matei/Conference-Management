package com.ubb.scalability.conference.config;

import com.ubb.scalability.conference.payload.SignUpRequest;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringBeansConfiguration {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public SignUpRequest signUpRequest() {
        return new SignUpRequest();
    }
}
