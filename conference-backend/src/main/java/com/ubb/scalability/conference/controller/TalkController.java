package com.ubb.scalability.conference.controller;

import com.ubb.scalability.conference.model.TalkDTO;
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

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<TalkDTO> findTalks() {
        return talkService.getTalksFreePlaces();
    }

    @RequestMapping(value = "/register/", method = RequestMethod.POST)
    public void registerForTalk(@RequestParam("userId") Integer userId, @RequestParam("talkId") Integer talkId) {
        talkService.registerForTalk(userId,talkId);
    }
}
