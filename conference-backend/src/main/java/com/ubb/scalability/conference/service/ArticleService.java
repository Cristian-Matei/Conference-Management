package com.ubb.scalability.conference.service;

import com.ubb.scalability.conference.model.ArticleDTO;
import com.ubb.scalability.conference.model.User;
import com.ubb.scalability.conference.model.UserDTO;
import com.ubb.scalability.conference.model.Article;
import com.ubb.scalability.conference.repository.ArticleRepository;
import com.ubb.scalability.conference.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ArticleService {

    private final ArticleRepository articleRepository;

    private final UserRepository userRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    public List<ArticleDTO> getArticlesByDomain(String domain) {
        return articleRepository.findArticlesByDomain(domain).stream().map(Article::toArticleDTO)
                .collect(Collectors.toList());
    }

    public List<ArticleDTO> getArticlesByAuthor(UserDTO userDTO) {
        User user = userRepository.findUserByFirstNameAndLastName(userDTO.getFirstName(), userDTO.getLastName());
        return articleRepository.findArticlesByAuthor(user).stream().map(Article::toArticleDTO)
                .collect(Collectors.toList());
    }

    public List<ArticleDTO> getArticles() {
        return articleRepository.findAll().stream().map(Article::toArticleDTO).collect(Collectors.toList());
    }

    public List<ArticleDTO> getArticlesByDomainAndAuthor(String domain, UserDTO author) {
        User user = userRepository.findUserByFirstNameAndLastName(author.getFirstName(), author.getLastName());
        return articleRepository.findArticlesByDomainAndAuthor(domain, user).stream().map(Article::toArticleDTO)
                .collect(Collectors.toList());
    }

    public void saveArticle(Article article) {
        articleRepository.save(article);
    }
}
