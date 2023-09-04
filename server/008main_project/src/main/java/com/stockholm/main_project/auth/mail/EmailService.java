package com.stockholm.main_project.auth.mail;

public interface EmailService {
    String sendSimpleMessage(String to)throws Exception;
}