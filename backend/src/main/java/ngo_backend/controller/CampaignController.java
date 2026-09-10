package ngo_backend.controller;

import ngo_backend.entity.Campaign;
import ngo_backend.repository.CampaignRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin
public class CampaignController {

    private final CampaignRepository campaignRepository;

    public CampaignController(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    // GET - All Campaigns
    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    // GET - Campaign by ID
    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable Long id) {

        return campaignRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - Create Campaign
    @PostMapping
    public Campaign createCampaign(@RequestBody Campaign campaign) {

        if (campaign.getRaisedAmount() == null) {
            campaign.setRaisedAmount(BigDecimal.ZERO);
        }

        if (campaign.getStatus() == null) {
            campaign.setStatus("ACTIVE");
        }

        return campaignRepository.save(campaign);
    }

    // PUT - Update Campaign
    @PutMapping("/{id}")
    public ResponseEntity<Campaign> updateCampaign(
            @PathVariable Long id,
            @RequestBody Campaign updatedCampaign) {

        Campaign campaign = campaignRepository.findById(id).orElse(null);

        if (campaign == null) {
            return ResponseEntity.notFound().build();
        }

        campaign.setTitle(updatedCampaign.getTitle());
        campaign.setDescription(updatedCampaign.getDescription());
        campaign.setTargetAmount(updatedCampaign.getTargetAmount());
        campaign.setRaisedAmount(updatedCampaign.getRaisedAmount());
        campaign.setStatus(updatedCampaign.getStatus());

        Campaign savedCampaign = campaignRepository.save(campaign);

        return ResponseEntity.ok(savedCampaign);
    }

    // DELETE - Delete Campaign
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCampaign(@PathVariable Long id) {

        if (!campaignRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        campaignRepository.deleteById(id);

        return ResponseEntity.ok("Campaign deleted successfully");
    }

    // GET - Campaign Progress
    @GetMapping("/{id}/progress")
    public Map<String, Object> getCampaignProgress(@PathVariable Long id) {

        Campaign campaign = campaignRepository.findById(id).orElse(null);

        if (campaign == null) {
            return null;
        }

        BigDecimal target = campaign.getTargetAmount();
        BigDecimal raised = campaign.getRaisedAmount();

        if (target == null || target.compareTo(BigDecimal.ZERO) == 0) {
            return null;
        }

        if (raised == null) {
            raised = BigDecimal.ZERO;
        }

        BigDecimal progress = raised
                .divide(target, 4, java.math.RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("campaignId", campaign.getCampaignId());
        response.put("title", campaign.getTitle());
        response.put("targetAmount", target);
        response.put("raisedAmount", raised);
        response.put("progressPercentage", progress);

        return response;
    }
}