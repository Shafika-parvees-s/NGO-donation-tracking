package ngo_backend.repository;

import ngo_backend.entity.CampaignUpdate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignUpdateRepository extends JpaRepository<CampaignUpdate, Integer> {
}