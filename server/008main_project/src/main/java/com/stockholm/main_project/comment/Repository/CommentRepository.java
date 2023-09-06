package com.stockholm.main_project.comment.Repository;

import com.stockholm.main_project.comment.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    // 기타 필요한 메서드 추가 가능
}
