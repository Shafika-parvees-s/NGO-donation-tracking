package ngo_backend.controller;
import ngo_backend.entity.CampaignUpdate;
import ngo_backend.repository.CampaignUpdateRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
@RestController
@RequestMapping("/api/campaign-updates")
@CrossOrigin
public class CampaignUpdateController {
    private final CampaignUpdateRepository campaignUpdateRepository;
    public CampaignUpdateController(
            CampaignUpdateRepository campaignUpdateRepository) {
        this.campaignUpdateRepository = campaignUpdateRepository;
    }
    @GetMapping
    public List<CampaignUpdate> getAllUpdates() {
        return campaignUpdateRepository.findAll();
    }
    @GetMapping("/{id}")
    public CampaignUpdate getUpdateById(@PathVariable Integer id) {
        return campaignUpdateRepository.findById(id).orElse(null);
    }
    @GetMapping("/campaign/{campaignId}")
    public List<CampaignUpdate> getUpdatesByCampaign(
            @PathVariable Long campaignId) {
        return campaignUpdateRepository.findByCampaignId(campaignId);
    }
    @PostMapping
    public CampaignUpdate createUpdate(
            @RequestBody CampaignUpdate campaignUpdate) {
        campaignUpdate.setCreatedAt(LocalDateTime.now());
        return campaignUpdateRepository.save(campaignUpdate);
    }
    @PutMapping("/{id}")
    public CampaignUpdate updateUpdate(
            @PathVariable Integer id,
            @RequestBody CampaignUpdate updatedUpdate) {
        CampaignUpdate existingUpdate =
                campaignUpdateRepository.findById(id).orElse(null);
        if (existingUpdate == null) {
            return null;
        }
        existingUpdate.setCampaignId(updatedUpdate.getCampaignId());
        existingUpdate.setTitle(updatedUpdate.getTitle());
        existingUpdate.setDescription(updatedUpdate.getDescription());
        existingUpdate.setImageUrl(updatedUpdate.getImageUrl());
        return campaignUpdateRepository.save(existingUpdate);
    }
    @DeleteMapping("/{id}")
    public void deleteUpdate(@PathVariable Integer id) {
        campaignUpdateRepository.deleteById(id);
    }
}