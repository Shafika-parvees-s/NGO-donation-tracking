package ngo_backend.controller;

import ngo_backend.entity.ContactMessage;
import ngo_backend.repository.ContactMessageRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/contact-messages")
@CrossOrigin
public class ContactMessageController {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageController(
            ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    @GetMapping("/{id}")
    public ContactMessage getMessageById(@PathVariable Integer id) {
        return contactMessageRepository
                .findById(id)
                .orElse(null);
    }

    @PostMapping
    public ContactMessage createMessage(
            @RequestBody ContactMessage contactMessage) {

        contactMessage.setCreatedAt(LocalDateTime.now());

        return contactMessageRepository.save(contactMessage);
    }

    @PutMapping("/{id}")
    public ContactMessage updateMessage(
            @PathVariable Integer id,
            @RequestBody ContactMessage updatedMessage) {

        ContactMessage existingMessage =
                contactMessageRepository.findById(id).orElse(null);

        if (existingMessage == null) {
            return null;
        }

        existingMessage.setName(updatedMessage.getName());
        existingMessage.setEmail(updatedMessage.getEmail());
        existingMessage.setSubject(updatedMessage.getSubject());
        existingMessage.setMessage(updatedMessage.getMessage());

        return contactMessageRepository.save(existingMessage);
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Integer id) {
        contactMessageRepository.deleteById(id);
    }
}