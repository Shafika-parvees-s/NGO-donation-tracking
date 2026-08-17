package ngo_backend.controller;

import ngo_backend.entity.Campaign;
import ngo_backend.repository.CampaignRepository;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin
public class CampaignController {

    private final CampaignRepository campaignRepository;

    public CampaignController(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    @GetMapping("/{id}")
    public Campaign getCampaignById(@PathVariable Long id) {
        return campaignRepository.findById(id).orElse(null);
    }

    // Campaign progress
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