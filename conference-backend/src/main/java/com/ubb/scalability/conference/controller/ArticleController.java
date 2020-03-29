package com.ubb.scalability.conference.controller;

import com.sun.istack.Nullable;
import com.ubb.scalability.conference.model.Article;
import com.ubb.scalability.conference.service.ArticleService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="conference/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public void saveArticle(@RequestBody Article article) {
        articleService.saveArticle(article);
    }
}
