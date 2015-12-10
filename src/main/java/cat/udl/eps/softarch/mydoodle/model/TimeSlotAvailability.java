package cat.udl.eps.softarch.mydoodle.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * Created by http://rhizomik.net/~roberto/
 */
@Entity
public class TimeSlotAvailability extends UUIDEntity {

    private Availability availability;

    @ManyToOne
    @JsonBackReference(value = "availability-participant")
    private ParticipantAvailability participant;

    @ManyToOne
    @JsonBackReference(value = "availability-timeSlot")
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
