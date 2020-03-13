package com.ubb.scalability.conference.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "talks", schema = "conference")
public class Talk {
    private int id;
    private Integer article;
    private Timestamp startTime;
    private Timestamp endTime;
    private Integer room;
    private Collection<TalkParticipant> talkParticipantsById;
    private Article articlesByArticle;
    private Room roomsByRoom;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "article", nullable = true)
    public Integer getArticle() {
        return article;
    }

    public void setArticle(Integer article) {
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

    @Basic
    @Column(name = "room", nullable = true)
    public Integer getRoom() {
        return room;
    }

    public void setRoom(Integer room) {
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

    @OneToMany(mappedBy = "talksByTalkId")
    public Collection<TalkParticipant> getTalkParticipantsById() {
        return talkParticipantsById;
    }

    public void setTalkParticipantsById(Collection<TalkParticipant> talkParticipantsById) {
        this.talkParticipantsById = talkParticipantsById;
    }

    @ManyToOne
    @JoinColumn(name = "article", referencedColumnName = "id")
    public Article getArticlesByArticle() {
        return articlesByArticle;
    }

    public void setArticlesByArticle(Article articlesByArticle) {
        this.articlesByArticle = articlesByArticle;
    }

    @ManyToOne
    @JoinColumn(name = "room", referencedColumnName = "id")
    public Room getRoomsByRoom() {
        return roomsByRoom;
    }

    public void setRoomsByRoom(Room roomsByRoom) {
        this.roomsByRoom = roomsByRoom;
    }
}
