package cat.udl.eps.softarch.mydoodle.model;

import cat.udl.eps.softarch.mydoodle.utils.MailUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * Created by http://rhizomik.net/~roberto/
 */
@Entity
public class ParticipantAvailability extends UUIDEntity {

    @Email(message = "Invalid E-Mail")
    @NotBlank(message = "Invalid E-Mail")
    private String participant;

    @ManyToOne
    private MeetingProposal meeting;

    @JsonIgnore
    private String participantKey;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "participant")
    private List<TimeSlotAvailability> slotAvailabilities;

    public ParticipantAvailability() {}

    public String getParticipant() { return participant; }

    public void setParticipant(String participant) { this.participant = participant; }

    public MeetingProposal getMeeting() { return meeting; }

    public void setMeeting(MeetingProposal meeting) { this.meeting = meeting; }

    public List<TimeSlotAvailability> getSlotAvailabilities() { return slotAvailabilities; }

    public void setParticipantKey(String participantKey) {
        this.participantKey = participantKey;
    }

    public String getParticipantKey() {
        return participantKey;
    }

    public void generateParticipantKey() {
        this.participantKey = "a" + MeetingProposal.generateRandomKey();
    }

    public void sendParticipantKey(MailUtils mailUtils) {
        StringBuilder sb = new StringBuilder("Hi ");
        sb.append(participant.split("@")[0]).append(",\n\n");
        sb.append("You have been invited to a new meeting proposal.\n");
        sb.append("Accessing through this link will allow you vote and modify your votes.\n");
        sb.append("Participant link: \n");
        sb.append("http://127.0.0.1:8080/api/participantAvailability/").append(getId()).append("?key=").append(getParticipantKey());
        sb.append("\n Thank you for using our app!");

        mailUtils.sendMessage(participant, "[MyDoodle] You have a new meeting", sb.toString());
    }
}
