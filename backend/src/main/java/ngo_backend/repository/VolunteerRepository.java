package ngo_backend.repository;

import ngo_backend.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VolunteerRepository
        extends JpaRepository<Volunteer, Integer> {

    Optional<Volunteer> findByEmail(String email);
}