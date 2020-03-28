package com.ubb.scalability.conference.service;

import com.ubb.scalability.conference.model.ArticleDTO;
import com.ubb.scalability.conference.model.UserDTO;
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
import java.util.stream.Collectors;

@Service
@Transactional
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    /***
     * Finds a list of articles based on given filter criteria which are optional
     * @param domain of an article
     * @param author of an article {@link UserDTO}
     * @return a list of articles mapped to {@link ArticleDTO}
     */
    public List<ArticleDTO> getArticles(String domain, UserDTO author) {
        List<Article> articles = new ArrayList<>();
        if (domain != null && author != null) {
            User user = userRepository.findByName(author.getFirstName(), author.getLastName());
            articles = articleRepository.findAll(Specification.where(hasDomain(domain).and(hasAuthor(user.getId()))));
        }
        if (domain != null) {
            articles = articleRepository.findAll(hasDomain(domain));
        } else if (author != null) {
            User user = userRepository.findByName(author.getFirstName(), author.getLastName());
            articles = articleRepository.findAll(hasAuthor(user.getId()));
        }
        if (domain == null && author == null) {
            articles = articleRepository.findAll();
        }
        return articles.stream().map(Article::toArticleDTO).collect(Collectors.toList());
    }

    private static Specification<Article> hasDomain(final String domain) {
        return (article, cq, cb) -> cb.equal(article.get("domain"), domain);
    }

    private static Specification<Article> hasAuthor(final Integer authorId) {
        return (article, cq, cb) -> cb.equal(article.get("author"), authorId);
    }
}
