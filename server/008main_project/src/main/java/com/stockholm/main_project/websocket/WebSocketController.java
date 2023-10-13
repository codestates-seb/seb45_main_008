package com.stockholm.main_project.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // 서버에서 독단적으로 실행되는 로직 (예: 주문 처리)
    public void check() {
        // 주문 처리 로직 작성

        // 클라이언트로 메시지를 보내기
        messagingTemplate.convertAndSend("/sub", "주문이 처리되었습니다.");
    }
}
