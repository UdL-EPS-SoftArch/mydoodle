package cat.udl.eps.softarch.mydoodle.model;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.annotation.Nonnegative;
import javax.annotation.Nullable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * Created by http://rhizomik.net/~roberto/
 */
@Entity
public class MeetingProposal extends UUIDEntity {

    @NotBlank
    private String title;

    @Nullable
    private String description;

    @Email(message = "Invalid E-Mail")
    @NotBlank(message = "Invalid E-Mail")
    private String organizer;

    @Nonnegative
    private int slotDuration;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "meeting")
    private List<TimeSlot> slots;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "meeting")
    private List<ParticipantAvailability> availabilities;

    public MeetingProposal() {}

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
}
