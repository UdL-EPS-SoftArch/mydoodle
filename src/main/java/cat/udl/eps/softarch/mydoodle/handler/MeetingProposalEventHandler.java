package cat.udl.eps.softarch.mydoodle.handler;

import cat.udl.eps.softarch.mydoodle.model.MeetingProposal;
import com.google.common.base.Preconditions;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Eric Labara
 */

@Component
@RepositoryEventHandler(MeetingProposal.class)
public class MeetingProposalEventHandler {

    @HandleBeforeCreate
    @Transactional
    public void handleMeetingProposalCreate(MeetingProposal meetingProposal){
        Preconditions.checkArgument(meetingProposal.getTitle().length() > 0, "You must provide a title for the meeting");
        Preconditions.checkArgument(meetingProposal.getSlotDuration() > 0, "Slot duration cannot be negative");
        Preconditions.checkArgument(meetingProposal.getOrganizer().matches("[\\w\\W]+@[\\w\\W]+\\.[\\w]+"), "Email %s is not valid.", meetingProposal.getOrganizer());
    }

    @HandleBeforeSave
    @Transactional
    public void handleMeetingProposalSave(MeetingProposal meetingProposal){
        Preconditions.checkArgument(meetingProposal.getSlotDuration() > 0, "Slot duration cannot be negative");
        Preconditions.checkArgument(meetingProposal.getOrganizer().matches("[\\w\\W]+@[\\w\\W]+\\.[\\w]+"), "Email %s is not valid.", meetingProposal.getOrganizer());
    }
}