package com.ubb.scalability.conference.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "rooms", schema = "conference")
public class Room {
    private int id;
    private String name;
    private Integer places;
    private Collection<Talk> talksById;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = true, length = 20)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "places", nullable = true)
    public Integer getPlaces() {
        return places;
    }

    public void setPlaces(Integer places) {
        this.places = places;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return id == room.id &&
                Objects.equals(name, room.name) &&
                Objects.equals(places, room.places);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, places);
    }

    @OneToMany(mappedBy = "roomsByRoom")
    public Collection<Talk> getTalksById() {
        return talksById;
    }

    public void setTalksById(Collection<Talk> talksById) {
        this.talksById = talksById;
    }
}
