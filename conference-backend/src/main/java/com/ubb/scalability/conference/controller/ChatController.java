package com.ubb.scalability.conference.controller;

import com.ubb.scalability.conference.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Objects;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessageToPublicChat")
    @SendTo("/topic/public")
    public ChatMessage sendMessageToPublicChat(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.addUserToPublicChat")
    @SendTo("/topic/public")
    public ChatMessage addUserToPublicChat(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", chatMessage.getSender());
        return chatMessage;
    }

    @MessageMapping("/chat.sendMessageToOrganizersChat")
    @SendTo("secured/topic/organizers")
    public ChatMessage sendMessageToOrganizersChat(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.addUserToOrganizersChat")
    @SendTo("secured/topic/organizers")
    public ChatMessage addUserToOrganizersChat(@Payload ChatMessage chatMessage,
                                           SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", chatMessage.getSender());
        return chatMessage;
    }

}