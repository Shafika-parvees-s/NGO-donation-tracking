package ngo_backend.repository;
import ngo_backend.entity.CampaignUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CampaignUpdateRepository
        extends JpaRepository<CampaignUpdate, Integer> {
    List<CampaignUpdate> findByCampaignId(Long campaignId);
}