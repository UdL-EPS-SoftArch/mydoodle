package cat.udl.eps.softarch.mydoodle.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

/**
 * Created by http://rhizomik.net/~roberto/
 */
@Entity
public class TimeSlot  extends UUIDEntity {

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date dateTime;

    @ManyToOne
    @JsonBackReference
    private MeetingProposal meeting;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "timeSlot")
    private List<TimeSlotAvailability> slotAvailabilities;

    private int yesVotes;
    private int maybeVotes;
    private int noVotes;

    public TimeSlot(){}

    public TimeSlot(Date dateTime) {
        dateTime = dateTime;
    }

    public Date getDateTime() { return dateTime; }

    public void setDateTime(Date dateTime) { this.dateTime = dateTime; }

    public MeetingProposal getMeeting() { return meeting; }

    public void setMeeting(MeetingProposal meeting) { this.meeting = meeting; }

    public List<TimeSlotAvailability> getSlotAvailabilities() { return slotAvailabilities; }

    public int getYesVotes() { return yesVotes; }

    public void setYesVotes(int yesVotes) { this.yesVotes = yesVotes; }

    public int getMaybeVotes() { return maybeVotes; }

    public void setMaybeVotes(int maybeVotes) { this.maybeVotes = maybeVotes; }

    public int getNoVotes() { return noVotes; }

    public void setNoVotes(int noVotes) { this.noVotes = noVotes; }

    }