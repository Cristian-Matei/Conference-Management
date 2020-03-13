package com.ubb.scalability.conference.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "articles", schema = "conference")
public class Article {
    private int id;
    private String title;
    private Integer author;
    private String domain;
    private String description;
    private String link;
    private User usersByAuthor;
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
    @Column(name = "title", nullable = true, length = 100)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "author", nullable = true)
    public Integer getAuthor() {
        return author;
    }

    public void setAuthor(Integer author) {
        this.author = author;
    }

    @Basic
    @Column(name = "domain", nullable = true, length = 50)
    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    @Basic
    @Column(name = "description", nullable = true, length = -1)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "link", nullable = true, length = 200)
    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Article article = (Article) o;
        return id == article.id &&
                Objects.equals(title, article.title) &&
                Objects.equals(author, article.author) &&
                Objects.equals(domain, article.domain) &&
                Objects.equals(description, article.description) &&
                Objects.equals(link, article.link);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, author, domain, description, link);
    }

    @ManyToOne
    @JoinColumn(name = "author", referencedColumnName = "id", insertable=false, updatable=false)
    public User getUsersByAuthor() {
        return usersByAuthor;
    }

    public void setUsersByAuthor(User usersByAuthor) {
        this.usersByAuthor = usersByAuthor;
    }

    @OneToMany(mappedBy = "articlesByArticle")
    public Collection<Talk> getTalksById() {
        return talksById;
    }

    public void setTalksById(Collection<Talk> talksById) {
        this.talksById = talksById;
    }
}
