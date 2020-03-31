package com.ubb.scalability.conference.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "talks", schema = "conference")
public class Talk {
    private int id;
    private Article article;
    private Timestamp startTime;
    private Timestamp endTime;
    private Room room;
    private Collection<User> attendees;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @OneToOne(fetch = FetchType.LAZY)
    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    @Basic
    @Column(name = "start_time", nullable = true)
    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    @Basic
    @Column(name = "end_time", nullable = true)
    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Talk talk = (Talk) o;
        return id == talk.id &&
                Objects.equals(article, talk.article) &&
                Objects.equals(startTime, talk.startTime) &&
                Objects.equals(endTime, talk.endTime) &&
                Objects.equals(room, talk.room);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, article, startTime, endTime, room);
    }

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "talks_participants",
            joinColumns = { @JoinColumn(name = "talk_id") },
            inverseJoinColumns = { @JoinColumn(name = "participant_id") }
    )
    public Collection<User> getAttendees() {
        return attendees;
    }

    public void setAttendees(Collection<User> attendees) {
        this.attendees = attendees;
    }

    public void addAttendee(User attendee) {
        if(attendees == null) {
            attendees = new ArrayList();
        }
        attendees.add(attendee);
    }

    public void removeAttendee(User attendee) {
        attendees.remove(attendee);
    }

    public TalkDTO toTalkDTO() {
        TalkDTO talkDTO = new TalkDTO();

        talkDTO.setId(getId());
        talkDTO.setTitle(getArticle().getTitle());
        talkDTO.setDomain(getArticle().getDomain());
        talkDTO.setAuthor(getArticle().getAuthor().toUserDTO());

        return talkDTO;
    }
}
