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

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "domain", paramType = "query", dataType = "string", format = "String"),
            @ApiImplicitParam(name = "firstName", paramType = "query", dataType = "string", format = "String"),
            @ApiImplicitParam(name = "lastName", paramType = "query", dataType = "string", format = "String")
    })
    public List<Article> findArticles(@RequestParam(required = false) String domain, @RequestParam(required = false) String firstName,
                                      @RequestParam(required = false) String lastName){
        UserDTO userDTO = null;
        if(firstName != null && lastName != null){
            userDTO = new UserDTO(firstName,lastName);
        }
        return articleService.getArticles(domain,userDTO);}
}
