package com.ubb.scalability.conference.service;

import com.ubb.scalability.conference.model.Article;
import com.ubb.scalability.conference.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public void saveArticle(Article article) {
        articleRepository.save(article);
    }
}
