package com.ubb.scalability.conference.controller;

import com.ubb.scalability.conference.model.Article;
import com.ubb.scalability.conference.model.ArticleDTO;
import com.ubb.scalability.conference.model.ArticleDetailDTO;
import com.ubb.scalability.conference.model.UserDTO;
import com.ubb.scalability.conference.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "conference/articles")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public void saveArticle(@Valid @RequestBody Article article) {
        articleService.saveArticle(article);
    }

    @RequestMapping(value = "/domain/{domain}", method = RequestMethod.GET)
    public List<ArticleDTO> filterArticlesByDomain(@PathVariable String domain) {
        return articleService.getArticlesByDomain(domain);
    }

    @RequestMapping(value = "/author", method = RequestMethod.GET)
    public List<ArticleDTO> filterArticleByAuthor(@RequestParam("firstName") String firstName,
                                                  @RequestParam("lastName") String lastName) {
        UserDTO userDTO = new UserDTO(firstName, lastName);
        return articleService.getArticlesByAuthor(userDTO);
    }

    @RequestMapping(value = "/filter", method = RequestMethod.GET)
    public List<ArticleDTO> filterArticlesByDomainAndAuthor(@RequestParam("domain") String domain,
                                                            @RequestParam("firstName") String firstName,
                                                            @RequestParam("lastName") String lastName) {
        UserDTO userDTO = new UserDTO(firstName, lastName);
        return articleService.getArticlesByDomainAndAuthor(domain,userDTO);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<ArticleDTO> getArticles() {
        return articleService.getArticles();
    }

    @RequestMapping(value = "/unregistered", method = RequestMethod.GET)
    public List<ArticleDetailDTO> getArticlesNotRegistered() {
        return articleService.getArticlesWithNoTalks();
    }
}
