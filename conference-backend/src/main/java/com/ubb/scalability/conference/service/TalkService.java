package com.ubb.scalability.conference.service;

import com.ubb.scalability.conference.model.*;
import com.ubb.scalability.conference.repository.ArticleRepository;
import com.ubb.scalability.conference.repository.RoomRepository;
import com.ubb.scalability.conference.repository.TalkRepository;
import com.ubb.scalability.conference.repository.UserRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TalkService {

    private final TalkRepository talkRepository;

    private final UserRepository userRepository;

    private final RoomRepository roomRepository;

    private final ArticleRepository articleRepository;

    @Autowired
    public TalkService(TalkRepository talkRepository, UserRepository userRepository, RoomRepository roomRepository,
                       ArticleRepository articleRepository) {
        this.talkRepository = talkRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.articleRepository = articleRepository;
    }

    public List<TalkDTO> getTalksByUserId(Integer userId) {
        User user = new User();
        user.setId(userId);
        return talkRepository.findByAttendeesContaining(user).stream().map(Talk::toTalkDTO).collect(Collectors.toList());
    }

    public List<TalkDTO> getTalksAvailable(Integer userId) {
        User user = new User();
        user.setId(userId);
        return talkRepository.findByAttendeesNotContaining(user).stream().map(Talk::toTalkDTO).collect(Collectors.toList());
    }

    public List<TalkDetailDTO> getAllTalks() {
        return talkRepository.findAll().stream().map(Talk::toTalkDetailDTO).collect(Collectors.toList());
    }

    public void registerForTalk(Integer userId, Integer talkId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Talk> talk = talkRepository.findById(talkId);
        user.ifPresent(u -> talk.ifPresent(t -> {
            t.addAttendee(u);
            talkRepository.save(t);
        }));
    }

    public void unregisterFromTalk(Integer userId, Integer talkId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Talk> talk = talkRepository.findById(talkId);
        user.ifPresent(u -> talk.ifPresent(t -> {
            t.removeAttendee(u);
            talkRepository.save(t);
        }));
    }

    public RoomDTO createTalk(NewTalkDTO newTalkDTO) {
        Optional<Room> room = roomRepository.findFirstByTalks_startTimeGreaterThan(newTalkDTO.getEndTime());
        Optional<Article> article = articleRepository.findById(newTalkDTO.getArticleId());

        return room.map(r -> {
            article.ifPresent(a -> {
                        Talk talk = new Talk();
                        talk.setArticle(a);
                        talk.setStartTime(newTalkDTO.getStartTime());
                        talk.setEndTime(newTalkDTO.getEndTime());
                        talk.setRoom(r);
                        talkRepository.save(talk);
                    }
            );
            return r.toRoomDTO();
        }).orElseThrow(() -> new NoSuchElementException("No room found!"));
    }
}
