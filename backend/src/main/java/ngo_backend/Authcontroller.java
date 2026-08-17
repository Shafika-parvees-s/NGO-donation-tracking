package ngo_backend;

import ngo_backend.dto.RegisterRequest;
import ngo_backend.dto.LoginRequest;
import ngo_backend.entity.User;
import ngo_backend.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class Authcontroller {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public Authcontroller(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request) {

        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {

            return ResponseEntity.badRequest()
                    .body("Email already registered");
        }

        // Create new user
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Hash password before saving
        String hashedPassword =
                passwordEncoder.encode(request.getPassword());

        user.setPassword(hashedPassword);

        // Default role
        user.setRole("USER");

        // Save user
        userRepository.save(user);

        return ResponseEntity.ok("Registration successful");
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody LoginRequest request) {

        // Find user using email
        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        // User not found
        if (user == null) {

            return ResponseEntity.badRequest()
                    .body("Invalid email or password");
        }

        // Check password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return ResponseEntity.badRequest()
                    .body("Invalid email or password");
        }

        // Login successful
        return ResponseEntity.ok("Login successful");
    }
}