package cat.udl.eps.softarch.mydoodle.model;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.annotation.Nullable;
import javax.crypto.KeyGenerator;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.DecimalMin;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
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

    private String adminKey;
    private String publicKey;

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

    public void generateKeys(){
        this.adminKey = "a" + generateRandomKey();
        this.publicKey = "p" + generateRandomKey();
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
        return publicKey.equals(key);
    }

    public void sendAdminKey(){
        StringBuilder sb = new StringBuilder("Hi ");
        sb.append(organizer.split("@")[0]).append(",\n\n");
        sb.append("Here is your admin link to the meeting proposal you've just created.\n");
        sb.append("Accessing through this link will allow you to modify and manage your meeting.\n");
        sb.append("Admin link: \n");
        sb.append("http://127.0.0.1:8080/meetingProposal/").append(getId()).append("?key=").append(adminKey).append("\n");
        sb.append("\n Thank you for using our app!");
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(new File("email.txt")));
            writer.write(sb.toString());
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //TODO: Send email to organizer with the admin key
    }

    public void sendParticipantKey(String email){
        //TODO: Send email to participant with public key
    }

    private String generateRandomKey(){
        String AB = "123456789ABCDEFGHIJKLMNOPKRSTUVWYZ!#?$%";
        SecureRandom rnd = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 16; i++){
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        }
        return sb.toString();
    }
}
