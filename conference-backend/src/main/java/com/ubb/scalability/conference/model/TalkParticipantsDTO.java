package com.ubb.scalability.conference.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TalkParticipantsDTO {

    private String title;

    private int numberOfParticipants;

    private int places;
}
