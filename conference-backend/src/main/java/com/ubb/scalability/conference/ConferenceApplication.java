package com.ubb.scalability.conference;

import com.ubb.scalability.conference.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class ConferenceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConferenceApplication.class, args);
    }

}
