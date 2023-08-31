package com.stockholm.main_project.utils;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class Time {
    public static String strHour(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmm");
        String formattedDateTime = localDateTime.format(formatter);

        formattedDateTime = formattedDateTime.concat("00");

        return formattedDateTime;
    }
}
