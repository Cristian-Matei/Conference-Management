package com.ubb.scalability.conference;

import com.ubb.scalability.conference.model.ArticleDTO;
import com.ubb.scalability.conference.model.Article;
import com.ubb.scalability.conference.model.User;
import com.ubb.scalability.conference.model.UserDTO;
import com.ubb.scalability.conference.repository.ArticleRepository;
import com.ubb.scalability.conference.repository.UserRepository;
import com.ubb.scalability.conference.service.ArticleService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {ConferenceApplication.class})
@ActiveProfiles("test")
public class ArticleServiceTest {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArticleService articleService;

    @Before
    public void setUp() {

        User user = new User();
        user.setId(1);
        user.setFirstName("john");
        user.setLastName("doe");
        user.setEmail("testuser@yahoo.com");
        user.setPassword("1234");
        userRepository.save(user);

        User user2 = new User();
        user2.setId(2);
        user2.setFirstName("mary");
        user2.setLastName("jane");
        user2.setEmail("testuser2@yahoo.com");
        user2.setPassword("12345");
        userRepository.save(user2);

        Article article = new Article();
        article.setId(1);
        article.setDomain("nature");
        article.setAuthor(user);
        article.setDescription("test");
        articleRepository.save(article);

        Article article2 = new Article();
        article2.setId(2);
        article2.setDomain("science");
        article2.setAuthor(user2);
        articleRepository.save(article2);

        Article article3 = new Article();
        article3.setId(3);
        article3.setDomain("nature");
        article3.setAuthor(user);
        articleRepository.save(article3);

        Article article4 = new Article();
        article4.setId(4);
        article4.setDomain("medicine");
        article4.setAuthor(user2);
        articleRepository.save(article4);

    }

    @Test
    public void filterArticlesByDomain() {
        List<ArticleDTO> articles = articleService.getArticles("nature",null);
        Assert.assertNotNull(articles);
        articles.forEach(article -> Assert.assertEquals("nature",article.getDomain()));
        Assert.assertEquals(2,articles.size());
    }

    @Test
    public void filterArticlesByAuthor() {
        List<ArticleDTO> articles = articleService.getArticles(null,new UserDTO("john","doe"));
        Assert.assertNotNull(articles);
        articles.forEach(article -> {
            Assert.assertEquals("john",article.getAuthor().getFirstName());
            Assert.assertEquals("doe", article.getAuthor().getLastName());
        });
        Assert.assertEquals(2, articles.size());
    }

    @Test
    public void filterArticlesByDomainAndAuthor() {
        List<ArticleDTO> articles = articleService.getArticles("science",new UserDTO("mary","jane"));
        Assert.assertNotNull(articles);
        articles.forEach(article -> {
            Assert.assertEquals("science", article.getDomain());
            Assert.assertEquals("mary", article.getAuthor().getFirstName());
            Assert.assertEquals("jane", article.getAuthor().getLastName());
        });
        Assert.assertEquals(1,articles.size());
    }

    @Test
    public void getArticlesNoFilter() {
        List<ArticleDTO> articles = articleService.getArticles(null, null);
        System.out.println(articles);
        Assert.assertEquals(4,articles.size());
    }

    @Test
    public void getArticlesFilterNotFound() {
        List<ArticleDTO> articles = articleService.getArticles("non existent domain",null);
        Assert.assertTrue(articles.isEmpty());
    }
}
