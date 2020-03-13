package com.ubb.scalability.conference.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "talk_participants", schema = "conference")
public class TalkParticipant {
    private int id;
    private Integer talkId;
    private Integer participantId;
    private Talk talksByTalkId;
    private User usersByParticipantId;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "talk_id", nullable = true)
    public Integer getTalkId() {
        return talkId;
    }

    public void setTalkId(Integer talkId) {
        this.talkId = talkId;
    }

    @Basic
    @Column(name = "participant_id", nullable = true)
    public Integer getParticipantId() {
        return participantId;
    }

    public void setParticipantId(Integer participantId) {
        this.participantId = participantId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TalkParticipant that = (TalkParticipant) o;
        return id == that.id &&
                Objects.equals(talkId, that.talkId) &&
                Objects.equals(participantId, that.participantId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, talkId, participantId);
    }

    @ManyToOne
    @JoinColumn(name = "talk_id", referencedColumnName = "id", insertable=false, updatable=false)
    public Talk getTalksByTalkId() {
        return talksByTalkId;
    }

    public void setTalksByTalkId(Talk talksByTalkId) {
        this.talksByTalkId = talksByTalkId;
    }

    @ManyToOne
    @JoinColumn(name = "participant_id", referencedColumnName = "id", insertable=false, updatable=false)
    public User getUsersByParticipantId() {
        return usersByParticipantId;
    }

    public void setUsersByParticipantId(User usersByParticipantId) {
        this.usersByParticipantId = usersByParticipantId;
    }
}
