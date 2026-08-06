package com.ngo.impact.repository;

import com.ngo.impact.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findByStatus(Campaign.Status status);
    List<Campaign> findByCategory(String category);
}
