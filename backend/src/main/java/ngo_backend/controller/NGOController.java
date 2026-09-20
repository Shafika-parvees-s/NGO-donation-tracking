package ngo_backend.controller;
import ngo_backend.entity.NGO;
import ngo_backend.repository.NGORepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/ngos")
@CrossOrigin
public class NGOController {
    private final NGORepository ngoRepository;
    public NGOController(NGORepository ngoRepository) {
        this.ngoRepository = ngoRepository;
    }
    @GetMapping
    public List<NGO> getAllNGOs() {
        return ngoRepository.findAll();
    }
    @GetMapping("/{id}")
    public NGO getNGOById(@PathVariable Integer id) {
        return ngoRepository.findById(id).orElse(null);
    }
    @GetMapping("/user/{userId}")
    public List<NGO> getNGOsByUser(@PathVariable Integer userId) {
        return ngoRepository.findByUserId(userId);
    }
    @PostMapping
    public NGO createNGO(@RequestBody NGO ngo) {
        return ngoRepository.save(ngo);
    }
    @PutMapping("/{id}")
    public NGO updateNGO(
            @PathVariable Integer id,
            @RequestBody NGO updatedNGO) {
        NGO existingNGO =
                ngoRepository.findById(id).orElse(null);
        if (existingNGO == null) {
            return null;
        }
        existingNGO.setUserId(updatedNGO.getUserId());
        existingNGO.setNgoName(updatedNGO.getNgoName());
        existingNGO.setDescription(updatedNGO.getDescription());
        existingNGO.setContact(updatedNGO.getContact());
        return ngoRepository.save(existingNGO);
    }
    @DeleteMapping("/{id}")
    public void deleteNGO(@PathVariable Integer id) {
        ngoRepository.deleteById(id);
    }
}