package com.ubb.scalability.conference.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "users", schema = "conference")
public class User {
    private int id;
    private String firstName;
    private String lastName;
    private String affiliation;
    private String email;
    private String password;
    private Boolean emailVerified;
    private String providerId;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;


    private Collection<Article> articlesById;
    private Collection<TalkParticipant> talkParticipantsById;
    private Collection<UserRole> usersRolesById;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "first_name", nullable = false, length = 50)
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "last_name", nullable = false, length = 50)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "affiliation", nullable = true, length = 100)
    public String getAffiliation() {
        return affiliation;
    }

    public void setAffiliation(String affiliation) {
        this.affiliation = affiliation;
    }

    @Email
    @Basic
    @Column(name = "email", nullable = false, length = 50)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "password", nullable = false, length = 256)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "email_verified", nullable = false)
    public Boolean getEmailVerified() { return emailVerified; }

    public void setEmailVerified(Boolean emailVerified) { this.emailVerified = emailVerified; }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id &&
                Objects.equals(firstName, user.firstName) &&
                Objects.equals(lastName, user.lastName) &&
                Objects.equals(affiliation, user.affiliation) &&
                Objects.equals(email, user.email) &&
                Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, affiliation, email, password);
    }

    @OneToMany(mappedBy = "usersByAuthor")
    public Collection<Article> getArticlesById() {
        return articlesById;
    }

    public void setArticlesById(Collection<Article> articlesById) {
        this.articlesById = articlesById;
    }

    @OneToMany(mappedBy = "usersByParticipantId")
    public Collection<TalkParticipant> getTalkParticipantsById() {
        return talkParticipantsById;
    }

    public void setTalkParticipantsById(Collection<TalkParticipant> talkParticipantsById) {
        this.talkParticipantsById = talkParticipantsById;
    }

    @OneToMany(mappedBy = "usersByUserId")
    public Collection<UserRole> getUsersRolesById() {
        return usersRolesById;
    }

    public void setUsersRolesById(Collection<UserRole> usersRolesById) {
        this.usersRolesById = usersRolesById;
    }
}
