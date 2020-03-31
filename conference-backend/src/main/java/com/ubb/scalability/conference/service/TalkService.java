package com.ubb.scalability.conference.service;

import com.ubb.scalability.conference.model.Talk;
import com.ubb.scalability.conference.model.TalkDTO;
import com.ubb.scalability.conference.model.User;
import com.ubb.scalability.conference.repository.TalkRepository;
import com.ubb.scalability.conference.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TalkService {

    @Autowired
    private TalkRepository talkRepository;

    @Autowired
    private UserRepository userRepository;

    public List<TalkDTO> getTalksByUserId(Integer userId) {
        User user = new User();
        user.setId(userId);
        return talkRepository.findByAttendeesContaining(user).stream().map(Talk::toTalkDTO).collect(Collectors.toList());
    }

    public List<TalkDTO> getTalksFreePlaces() {
        return talkRepository.findAll().stream().map(Talk::toTalkDTO).collect(Collectors.toList());
    }

    public void registerForTalk(Integer userId, Integer talkId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Talk> talk = talkRepository.findById(talkId);
        talk.get().addAttendee(user.get());
        talkRepository.save(talk.get());
    }
}
