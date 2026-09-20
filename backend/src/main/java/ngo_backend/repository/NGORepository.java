package ngo_backend.repository;
import ngo_backend.entity.NGO;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface NGORepository extends JpaRepository<NGO, Integer> {
    List<NGO> findByUserId(Integer userId);
}