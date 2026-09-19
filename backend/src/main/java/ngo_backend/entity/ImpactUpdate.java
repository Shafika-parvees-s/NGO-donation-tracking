package ngo_backend.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "impact_updates")
public class ImpactUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "impact_id")
    private Integer impactId;
    @Column(name = "campaign_id", nullable = false)
    private Long campaignId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;
    @Column(name = "amount_used")
    private BigDecimal amountUsed;
    @Column(name = "impact_date")
    private LocalDateTime impactDate;
    public ImpactUpdate() {
    }
    public Integer getImpactId() {
        return impactId;
    }
    public void setImpactId(Integer impactId) {
        this.impactId = impactId;
    }
    public Long getCampaignId() {
        return campaignId;
    }
    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public BigDecimal getAmountUsed() {
        return amountUsed;
    }
    public void setAmountUsed(BigDecimal amountUsed) {
        this.amountUsed = amountUsed;
    }
    public LocalDateTime getImpactDate() {
        return impactDate;
    }
    public void setImpactDate(LocalDateTime impactDate) {
        this.impactDate = impactDate;
    }
}