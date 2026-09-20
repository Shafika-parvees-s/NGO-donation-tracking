package ngo_backend.repository;

import ngo_backend.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository
        extends JpaRepository<ContactMessage, Integer> {
}