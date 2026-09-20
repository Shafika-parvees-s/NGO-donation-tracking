package ngo_backend.entity;
import jakarta.persistence.*;
@Entity
@Table(name = "ngos")
public class NGO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ngo_id")
    private Integer ngoId;
    @Column(name = "user_id", nullable = false)
    private Integer userId;
    @Column(name = "ngo_name", nullable = false)
    private String ngoName;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String contact;
    public NGO() {
    }
    public Integer getNgoId() {
        return ngoId;
    }
    public void setNgoId(Integer ngoId) {
        this.ngoId = ngoId;
    }
    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public String getNgoName() {
        return ngoName;
    }
    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getContact() {
        return contact;
    }
    public void setContact(String contact) {
        this.contact = contact;
    }
}