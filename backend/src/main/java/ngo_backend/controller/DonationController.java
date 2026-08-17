package ngo_backend.controller;

import ngo_backend.entity.Campaign;
import ngo_backend.entity.Donation;
import ngo_backend.repository.CampaignRepository;
import ngo_backend.repository.DonationRepository;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin
public class DonationController {

    private final DonationRepository donationRepository;
    private final CampaignRepository campaignRepository;

    public DonationController(
            DonationRepository donationRepository,
            CampaignRepository campaignRepository) {

        this.donationRepository = donationRepository;
        this.campaignRepository = campaignRepository;
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Donation getDonationById(@PathVariable Integer id) {
        return donationRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Donation createDonation(@RequestBody Donation donation) {

        // Set donation date
        donation.setDonationDate(LocalDateTime.now());

        // Save donation
        Donation savedDonation = donationRepository.save(donation);

        // Find campaign
        Campaign campaign = campaignRepository
                .findById(donation.getCampaignId().longValue())
                .orElse(null);

        // Update raised amount
        if (campaign != null) {

            BigDecimal raisedAmount = campaign.getRaisedAmount();

            if (raisedAmount == null) {
                raisedAmount = BigDecimal.ZERO;
            }

            BigDecimal newRaisedAmount =
                    raisedAmount.add(donation.getAmount());

            campaign.setRaisedAmount(newRaisedAmount);

            campaignRepository.save(campaign);
        }

        return savedDonation;
    }
}