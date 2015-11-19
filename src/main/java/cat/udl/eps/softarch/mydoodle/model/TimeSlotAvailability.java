package cat.udl.eps.softarch.mydoodle.model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * Created by http://rhizomik.net/~roberto/
 */
@Entity
public class TimeSlotAvailability extends UUIDEntity {

    private Availability availability;

    @ManyToOne
    private ParticipantAvailability participant;

    @ManyToOne
    private TimeSlot timeSlot;

    public TimeSlotAvailability() {}

    public TimeSlotAvailability(Availability availability) {
        availability = availability;
    }

    public Availability getAvailability() { return availability; }

    public void setAvailability(Availability availability) { this.availability = availability; }

    public ParticipantAvailability getParticipant() { return participant; }

    public void setParticipant(ParticipantAvailability participant) { this.participant = participant; }

    public TimeSlot getTimeSlot() { return timeSlot; }

    public void setTimeSlot(TimeSlot timeSlot) { this.timeSlot = timeSlot; }
}
