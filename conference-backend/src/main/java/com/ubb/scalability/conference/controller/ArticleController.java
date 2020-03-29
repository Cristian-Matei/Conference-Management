package com.ubb.scalability.conference.controller;

import com.ubb.scalability.conference.model.Article;
import com.ubb.scalability.conference.model.ArticleDTO;
import com.ubb.scalability.conference.model.UserDTO;
import com.ubb.scalability.conference.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "conference/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

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

    @RequestMapping(value = "/filterall", method = RequestMethod.GET)
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
}
