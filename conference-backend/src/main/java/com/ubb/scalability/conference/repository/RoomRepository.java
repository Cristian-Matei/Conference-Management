package com.ubb.scalability.conference.repository;

import com.ubb.scalability.conference.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer> {
}
