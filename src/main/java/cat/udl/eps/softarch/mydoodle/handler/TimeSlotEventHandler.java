package cat.udl.eps.softarch.mydoodle.handler;

import cat.udl.eps.softarch.mydoodle.model.TimeSlot;
import cat.udl.eps.softarch.mydoodle.repository.TimeSlotRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeLinkSave;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by http://rhizomik.net/~roberto/
 */

@Component
@RepositoryEventHandler(TimeSlot.class)
public class TimeSlotEventHandler {
    final Logger logger = LoggerFactory.getLogger(TimeSlotEventHandler.class);

    @Autowired
    TimeSlotRepository timeSlotRepository;

    @HandleBeforeCreate
    @Transactional
    public void handleTimeSlotCreate(TimeSlot slot) {
        logger.info("Creating: {}", slot);
    }

    @HandleBeforeSave
    @Transactional
    public void handleTimeSlotSave(TimeSlot slot) {
        logger.info("Saving: {}", slot);
    }


    @HandleBeforeLinkSave
    public void handleTimeSlotLinkSave(TimeSlot timeSlot, Object o) {
        logger.info("Saving link: {} to {}", timeSlot, o);
    }
}
