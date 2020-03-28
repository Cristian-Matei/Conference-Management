package com.ubb.scalability.conference.repository;

import com.ubb.scalability.conference.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("select user from User user where user.firstName = ?1 and user.lastName = ?2")
    User findByName(String firstName, String lastName);
}
