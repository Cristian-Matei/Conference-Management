package com.ubb.scalability.conference.repository;

import com.ubb.scalability.conference.model.Article;
import com.ubb.scalability.conference.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    List<Article> findArticlesByDomain(String domain);

    List<Article> findArticlesByAuthor(User author);

    List<Article> findArticlesByDomainAndAuthor(String domain, User author);
}
