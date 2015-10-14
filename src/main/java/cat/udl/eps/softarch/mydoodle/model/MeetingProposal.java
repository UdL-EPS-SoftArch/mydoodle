package cat.udl.eps.softarch.mydoodle.model;

import cat.udl.eps.softarch.mydoodle.utils.MailUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.annotation.Nullable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.DecimalMin;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by http://rhizomik.net/~roberto/
 */
@Entity
public class MeetingProposal extends UUIDEntity {

    @NotBlank(message = "Meeting title cannot be blank")
    private String title;

    @Nullable
    private String description;

    @Email(message = "E-Mail ${validatedValue} is not valid", regexp = ".*@.*\\..*")
    @NotBlank(message = "E-Mail cannot be blank")
    private String organizer;

    @DecimalMin(message = "Slot duration cannot be negative", value = "0")
    private int slotDuration;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "meeting")
    private List<TimeSlot> slots;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "meeting")
    private List<ParticipantAvailability> availabilities;

    @JsonIgnore
    private String adminKey = "";

    MeetingProposal() {}

    public MeetingProposal(String title, String description, String organizer, int slotDuration) {
        this.title = title;
        this.description = description;
        this.organizer = organizer;
        this.slotDuration = slotDuration;

        this.slots = new ArrayList<>();
        this.availabilities = new ArrayList<>();
    }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    @Nullable
    public String getDescription() { return description; }

    public void setDescription(@Nullable String description) { this.description = description; }

    public String getOrganizer() { return organizer; }

    public void setOrganizer(String organizer) { this.organizer = organizer; }

    public int getSlotDuration() { return slotDuration; }

    public void setSlotDuration(int slotDuration) { this.slotDuration = slotDuration; }

    public List<TimeSlot> getSlots() { return slots; }

    public List<ParticipantAvailability> getAvailabilities() { return availabilities; }

    public String getAdminKey(){ return adminKey; }

    public void setAdminKey(String adminKey) {
        this.adminKey = adminKey;
    }

    public void generateAdminKey() {
        this.adminKey = "a" + generateRandomKey();
    }

    public String generateParticipantKey(){
        return "p" + generateRandomKey();
    }

    public boolean isAdmin(String key){
        return adminKey.equals(key);
    }

    @Override
    public String toString() {
        return "MeetingProposal{" +
                "slotDuration=" + slotDuration +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", organizer='" + organizer + '\'' +
                '}';
    }

    public boolean isParticipant(String key) {
        //TODO: Check if the key belongs to some user
        return false;
    }

    public void sendAdminKey(MailUtils mailUtils) {
        StringBuilder sb = new StringBuilder("Hi ");
        sb.append(organizer.split("@")[0]).append(",\n\n");
        sb.append("Here is your admin link to the meeting proposal you've just created.\n");
        sb.append("Accessing through this link will allow you to modify and manage your meeting.\n");
        sb.append("Admin link: \n");
        sb.append("http://127.0.0.1:8080/api/meetingProposals/").append(getId()).append("?key=").append(adminKey).append("\n");
        sb.append("\n Thank you for using our app!");

        mailUtils.sendMessage(organizer, "[MyDoodle] Get your admin link", sb.toString());
    }

    static String generateRandomKey(){
        String AB = "123456789ABCDEFGHIJKLMNOPKRSTUVWYZabcdefghijklmnopkrstuvwyz";
        SecureRandom rnd = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 16; i++){
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        }
        return sb.toString();
    }
}
