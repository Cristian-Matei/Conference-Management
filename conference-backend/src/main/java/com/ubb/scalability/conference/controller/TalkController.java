package com.ubb.scalability.conference.controller;

import com.ubb.scalability.conference.model.TalkDTO;
import com.ubb.scalability.conference.payload.RegistrationRequest;
import com.ubb.scalability.conference.service.TalkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "conference/talks")
public class TalkController {

    @Autowired
    private TalkService talkService;

    @RequestMapping(value = "/attendee/{userId}", method = RequestMethod.GET)
    public List<TalkDTO> findTalksForUser(@PathVariable Integer userId) {
        return talkService.getTalksByUserId(userId);
    }

    @RequestMapping(value = "/available", method = RequestMethod.GET)
    public List<TalkDTO> findTalks(@RequestParam Integer userId ) {
        return talkService.getTalksAvailable(userId);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public void registerForTalk(@RequestBody RegistrationRequest registrationRequest) {
        talkService.registerForTalk(registrationRequest.getUserId(),registrationRequest.getTalkId());
    }

    @RequestMapping(value = "/unregister", method = RequestMethod.POST)
    public void unregisterFromTalk(@RequestBody RegistrationRequest registrationRequest) {
        talkService.unregisterFromTalk(registrationRequest.getUserId(),registrationRequest.getTalkId());
    }
}
