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

    private final TalkRepository talkRepository;

    private final UserRepository userRepository;

    @Autowired
    public TalkService(TalkRepository talkRepository, UserRepository userRepository) {
        this.talkRepository = talkRepository;
        this.userRepository = userRepository;
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
}
