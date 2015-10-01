package cat.udl.eps.softarch.mydoodle.model;

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

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "participant")
    private List<TimeSlotAvailability> slotsAvailabilities;

    public ParticipantAvailability() {}

    public String getParticipant() { return participant; }

    public void setParticipant(String participant) { this.participant = participant; }

    public MeetingProposal getMeeting() { return meeting; }

    public void setMeeting(MeetingProposal meeting) { this.meeting = meeting; }

    public List<TimeSlotAvailability> getSlotsAvailabilities() { return slotsAvailabilities; }
}
