package com.ubb.scalability.conference.repository;

import com.ubb.scalability.conference.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Integer>{
}
