package com.ubb.scalability.conference.repository;

import com.ubb.scalability.conference.model.TalkParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TalkParticipantRepository extends JpaRepository<TalkParticipant, Integer> {
}
