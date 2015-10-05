package cat.udl.eps.softarch.mydoodle.model;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.annotation.Nullable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.DecimalMin;
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

    public MeetingProposal() {}

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

    @Override
    public String toString() {
        return "MeetingProposal{" +
                "slotDuration=" + slotDuration +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", organizer='" + organizer + '\'' +
                '}';
    }
}
