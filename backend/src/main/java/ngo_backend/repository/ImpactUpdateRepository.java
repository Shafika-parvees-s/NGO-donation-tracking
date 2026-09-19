package ngo_backend.repository;
import ngo_backend.entity.ImpactUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ImpactUpdateRepository
        extends JpaRepository<ImpactUpdate, Integer> {
    List<ImpactUpdate> findByCampaignId(Long campaignId);
}