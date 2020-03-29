package com.ubb.scalability.conference.controller;

import com.ubb.scalability.conference.model.Article;
import com.ubb.scalability.conference.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value="conference/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public void saveArticle(@Valid @RequestBody Article article) {
        articleService.saveArticle(article);
    }
}
