package com.ubb.scalability.conference.repository;

import com.ubb.scalability.conference.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
