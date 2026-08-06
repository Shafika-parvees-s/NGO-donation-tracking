package com.ngo.impact.controller;

import com.ngo.impact.entity.Campaign;
import com.ngo.impact.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/campaigns")
@CrossOrigin(origins = "*")
public class CampaignController {

    @Autowired
    private CampaignRepository campaignRepository;

    @GetMapping
    public ResponseEntity<List<Campaign>> getAllCampaigns() {
        return ResponseEntity.ok(campaignRepository.findAll());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Campaign>> getActiveCampaigns() {
        return ResponseEntity.ok(campaignRepository.findByStatus(Campaign.Status.ACTIVE));
    }

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(@RequestBody Campaign campaign) {
        campaign.setStatus(Campaign.Status.PENDING);
        Campaign saved = campaignRepository.save(campaign);
        return ResponseEntity.ok(saved);
    }
}
