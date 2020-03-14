package com.ubb.scalability.conference.repository;

import com.ubb.scalability.conference.model.Talk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TalkRepository extends JpaRepository<Talk, Integer> {
}
