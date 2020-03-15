package com.ubb.scalability.conference.repository;

import com.ubb.scalability.conference.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
}
