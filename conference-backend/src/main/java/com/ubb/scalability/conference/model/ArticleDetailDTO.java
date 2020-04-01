package com.ubb.scalability.conference.model;

import lombok.Data;

@Data
public class ArticleDetailDTO {

    private int id;

    private String title;

    private String domain;

    private String description;

    private UserDTO author;
}
