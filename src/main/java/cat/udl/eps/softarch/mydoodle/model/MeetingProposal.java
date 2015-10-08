package cat.udl.eps.softarch.mydoodle.model;

import java.util.*;
import javafx.util.Pair;
import cat.udl.eps.softarch.mydoodle.utils.MailUtils;
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

    public void generateAdminKey(){
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

    public void sendAdminKey(){
        StringBuilder sb = new StringBuilder("Hi ");
        sb.append(organizer.split("@")[0]).append(",\n\n");
        sb.append("Here is your admin link to the meeting proposal you've just created.\n");
        sb.append("Accessing through this link will allow you to modify and manage your meeting.\n");
        sb.append("Admin link: \n");
        sb.append("http://127.0.0.1:8080/api/meetingProposals/").append(getId()).append("?key=").append(adminKey).append("\n");
        sb.append("\n Thank you for using our app!");

        MailUtils.getInstance().sendMessage(organizer, "[MyDoodle] Get your admin link", sb.toString());
    }

    public List<Pair<String,String>> sendParticipantKeys(){
        List<Pair<String,String>> result = new ArrayList<Pair<String ,String>>();
        StringBuilder urlSB = new StringBuilder();
        Pair<String,String> item;
        if(availabilities.isEmpty()){
            return result;
        }
        for (ParticipantAvailability participantAvailability : availabilities) {
            urlSB.append("http://127.0.0.1:8080/api/meetingProposals/").append(getId()).append("?key=").append(generateParticipantKey());
            item = new Pair<>(participantAvailability.getParticipant(),urlSB.toString());
            result.add(item);
            String message = createMessage(item);
            MailUtils.getInstance().sendMessage(item.getKey(),"[MyDoodle] You have a new meeting",message);
        }
        return result;


    }

    private String createMessage(Pair<String, String> item) {
        StringBuilder sb = new StringBuilder("Hi ");
        sb.append(item.getValue().split("@")[0]).append(",\n\n");
        sb.append("You have been invited to a new meeting proposal.\n");
        sb.append("Accessing through this link will allow you vote and modify your votes.\n");
        sb.append("Participant link: \n");
        sb.append(item.getValue()).append("\n");
        sb.append("\n Thank you for using our app!");

        return sb.toString();
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
