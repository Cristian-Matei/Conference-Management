package com.ubb.scalability.conference.repository;

import com.ubb.scalability.conference.model.Talk;
import com.ubb.scalability.conference.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TalkRepository extends JpaRepository<Talk, Integer> {

    List<Talk> findByAttendeesContaining(User attendee);

    List<Talk> findByAttendeesNotContaining(User attendee);
}

