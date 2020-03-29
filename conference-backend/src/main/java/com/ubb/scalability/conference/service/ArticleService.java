package com.ubb.scalability.conference.service;

import com.ubb.scalability.conference.controller.UserDTO;
import com.ubb.scalability.conference.model.Article;
import com.ubb.scalability.conference.model.User;
import com.ubb.scalability.conference.repository.ArticleRepository;
import com.ubb.scalability.conference.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public void saveArticle(Article article) {
        articleRepository.save(article);
    }
}
