package cat.udl.eps.softarch.mydoodle.model;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
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

    private String participantKey;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "participant")
    private List<TimeSlotAvailability> slotsAvailabilities;

    public ParticipantAvailability() {}

    public String getParticipant() { return participant; }

    public void setParticipant(String participant) { this.participant = participant; }

    public MeetingProposal getMeeting() { return meeting; }

    public void setMeeting(MeetingProposal meeting) { this.meeting = meeting; }

    public List<TimeSlotAvailability> getSlotsAvailabilities() { return slotsAvailabilities; }

    public void setParticipantKey(String participantKey) {
        this.participantKey = participantKey;
    }

    public String getParticipantKey() {
        return participantKey;
    }
}
