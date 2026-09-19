package ngo_backend.controller;

import ngo_backend.entity.ImpactUpdate;
import ngo_backend.repository.ImpactUpdateRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/impacts")
@CrossOrigin
public class ImpactUpdateController {

    private final ImpactUpdateRepository impactUpdateRepository;

    public ImpactUpdateController(
            ImpactUpdateRepository impactUpdateRepository) {
        this.impactUpdateRepository = impactUpdateRepository;
    }

    @GetMapping
    public List<ImpactUpdate> getAllImpacts() {
        return impactUpdateRepository.findAll();
    }

    @GetMapping("/{id}")
    public ImpactUpdate getImpactById(@PathVariable Integer id) {
        return impactUpdateRepository.findById(id).orElse(null);
    }

    @GetMapping("/campaign/{campaignId}")
    public List<ImpactUpdate> getImpactsByCampaign(
            @PathVariable Long campaignId) {

        return impactUpdateRepository.findByCampaignId(campaignId);
    }

    @PostMapping
    public ImpactUpdate createImpact(
            @RequestBody ImpactUpdate impactUpdate) {

        impactUpdate.setImpactDate(LocalDateTime.now());

        return impactUpdateRepository.save(impactUpdate);
    }

    @PutMapping("/{id}")
    public ImpactUpdate updateImpact(
            @PathVariable Integer id,
            @RequestBody ImpactUpdate updatedImpact) {

        ImpactUpdate existingImpact =
                impactUpdateRepository.findById(id).orElse(null);

        if (existingImpact == null) {
            return null;
        }

        existingImpact.setCampaignId(updatedImpact.getCampaignId());
        existingImpact.setTitle(updatedImpact.getTitle());
        existingImpact.setDescription(updatedImpact.getDescription());
        existingImpact.setAmountUsed(updatedImpact.getAmountUsed());

        return impactUpdateRepository.save(existingImpact);
    }

    @DeleteMapping("/{id}")
    public void deleteImpact(@PathVariable Integer id) {
        impactUpdateRepository.deleteById(id);
    }
}