package cat.udl.eps.softarch.mydoodle.model;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.Date;

/**
 * Created by http://rhizomik.net/~roberto/
 */
@Entity
public class TimeSlot  extends UUIDEntity {

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date dateTime;

    @ManyToOne
    private MeetingProposal meeting;

    public TimeSlot(){}

    public TimeSlot(Date dateTime) {
        dateTime = dateTime;
    }

    public Date getDateTime() { return dateTime; }

    public void setDateTime(Date dateTime) { this.dateTime = dateTime; }

    public MeetingProposal getMeeting() { return meeting; }

    public void setMeeting(MeetingProposal meeting) { this.meeting = meeting; }
}