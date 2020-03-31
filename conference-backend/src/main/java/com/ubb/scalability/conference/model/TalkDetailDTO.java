package com.ubb.scalability.conference.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class TalkDetailDTO {

    private Integer id;

    private String title;

    private Timestamp startTime;

    private Timestamp endTime;

    private RoomDTO room;
}
