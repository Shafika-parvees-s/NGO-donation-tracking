package ngo_backend.controller;

import ngo_backend.entity.Volunteer;
import ngo_backend.repository.VolunteerRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
@CrossOrigin
public class VolunteerController {

    private final VolunteerRepository volunteerRepository;

    public VolunteerController(VolunteerRepository volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
    }

    @GetMapping
    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Volunteer getVolunteerById(@PathVariable Integer id) {
        return volunteerRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Volunteer createVolunteer(
            @RequestBody Volunteer volunteer) {

        volunteer.setJoinedAt(LocalDateTime.now());

        return volunteerRepository.save(volunteer);
    }

    @PutMapping("/{id}")
    public Volunteer updateVolunteer(
            @PathVariable Integer id,
            @RequestBody Volunteer updatedVolunteer) {

        Volunteer existingVolunteer =
                volunteerRepository.findById(id).orElse(null);

        if (existingVolunteer == null) {
            return null;
        }

        existingVolunteer.setName(updatedVolunteer.getName());
        existingVolunteer.setEmail(updatedVolunteer.getEmail());
        existingVolunteer.setPhone(updatedVolunteer.getPhone());
        existingVolunteer.setSkills(updatedVolunteer.getSkills());

        return volunteerRepository.save(existingVolunteer);
    }

    @DeleteMapping("/{id}")
    public void deleteVolunteer(@PathVariable Integer id) {
        volunteerRepository.deleteById(id);
    }

    @GetMapping("/email/{email}")
    public Volunteer getVolunteerByEmail(
            @PathVariable String email) {

        return volunteerRepository
                .findByEmail(email)
                .orElse(null);
    }
}
