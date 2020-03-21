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

    @Autowired
    private UserRepository userRepository;

    public List<Article> getArticles(String domain, UserDTO author) {
        if(domain != null && author != null) {
            User user = userRepository.findByName(author.getFirstName(),author.getLastName());
            return articleRepository.findAll(Specification.where(hasDomain(domain).and(hasAuthor(user.getId()))));
        }
        if(domain != null) {
            return articleRepository.findAll(hasDomain(domain));
        } else if (author != null) {
            User user = userRepository.findByName(author.getFirstName(),author.getLastName());
            return articleRepository.findAll(hasAuthor(user.getId()));
        }
        return articleRepository.findAll();
    }

    private static Specification<Article> hasDomain(final String domain) {
        return (article, cq, cb) -> cb.equal(article.get("domain"), domain);
    }

    private static Specification<Article> hasAuthor(final Integer authorId) {
        return (article, cq, cb) -> cb.equal(article.get("author"), authorId);
    }
}
