package com.ubb.scalability.conference.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "articles", schema = "conference")
public class Article {
    private Integer id;
    private String title;
    private User author;
    private String domain;
    private String description;
    private String link;
    private Talk talk;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    @ManyToOne(fetch = FetchType.LAZY)
    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
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
    @Column(name = "description", nullable = true, length = 500)
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

    @OneToOne(fetch = FetchType.EAGER)
    public Talk getTalk() {
        return talk;
    }

    public void setTalk(Talk talk) {
        this.talk = talk;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Article article = (Article) o;
        return Objects.equals(id, article.id) &&
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

    public ArticleDTO toArticleDTO(){
        ArticleDTO articleDTO = new ArticleDTO();
        articleDTO.setId(getId());
        articleDTO.setTitle(getTitle());
        articleDTO.setDomain(getDomain());
        articleDTO.setAuthor(getAuthor().toUserDTO());
        return articleDTO;
    }

    public ArticleDetailDTO toArticleDetailDTO() {
        ArticleDetailDTO articleDetailDTO = new ArticleDetailDTO();
        articleDetailDTO.setId(getId());
        articleDetailDTO.setTitle(getTitle());
        articleDetailDTO.setDomain(getDomain());
        articleDetailDTO.setDescription(getDescription());
        articleDetailDTO.setAuthor(getAuthor().toUserDTO());
        return articleDetailDTO;
    }
}
