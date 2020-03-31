package com.ubb.scalability.conference.repository;

import com.ubb.scalability.conference.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    Optional<Room> findFirstByTalks_startTimeGreaterThan( Timestamp endTime);
}
