package cat.udl.eps.softarch.mydoodle.handler;

import cat.udl.eps.softarch.mydoodle.model.MeetingProposal;
import cat.udl.eps.softarch.mydoodle.model.ParticipantAvailability;
import cat.udl.eps.softarch.mydoodle.utils.MailUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Valentina Menabue on 13/10/2015.
 */
@Component
@RepositoryEventHandler(MeetingProposal.class)
public class ParticipantAvailabilityEventHandler {
    final Logger logger = LoggerFactory.getLogger(ParticipantAvailabilityEventHandler.class);

    @Autowired
    MailUtils mailUtils;

    @HandleBeforeCreate
    @Transactional
    public void handleParticipantAvailabilityCreate(ParticipantAvailability participant) {
        logger.info("Creating: {}", participant);
    }

    @HandleBeforeSave
    @Transactional
    public void handleParticipantAvailabilitySave(ParticipantAvailability participant) {
        logger.info("Saving: {}", participant);
    }

    @HandleBeforeLinkSave
    public void handleParticipantAvailabilityLinkSave(ParticipantAvailability participant, Object o) {
        logger.info("Saving link: {} to {}", participant, o);
    }

    @HandleAfterCreate
    @Transactional
    public void handleMeetingProposalPostCreate(ParticipantAvailability participantAvailability) {
        participantAvailability.generateParticipantKey();
        participantAvailability.sendParticipantKey(mailUtils);
    }

}
