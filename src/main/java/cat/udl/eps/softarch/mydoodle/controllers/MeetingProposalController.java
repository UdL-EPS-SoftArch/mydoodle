package cat.udl.eps.softarch.mydoodle.controllers;

import cat.udl.eps.softarch.mydoodle.exceptions.InvalidKeyException;
import cat.udl.eps.softarch.mydoodle.model.MeetingProposal;
import cat.udl.eps.softarch.mydoodle.repository.MeetingProposalRepository;
import cat.udl.eps.softarch.mydoodle.utils.MailUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.UUID;

@RepositoryRestController
public class MeetingProposalController {

    @Autowired
    private MeetingProposalRepository repository;

    @Autowired
    private MailUtils mailUtils;

    @RequestMapping(value = "/meetingProposals/{id}", method = RequestMethod.GET)
    public @ResponseBody MeetingProposal getMeetingProposal(@PathVariable String id, @RequestParam(value = "key", required = false) String key) throws Exception{
        MeetingProposal meetingProposal = repository.findOne(UUID.fromString(id));
        if (meetingProposal == null)
            throw new NullPointerException();

        if (meetingProposal.isAdmin(key))
            return  meetingProposal;
        else
            throw new InvalidKeyException();
    }

    @RequestMapping(value = "/meetingProposals", method = RequestMethod.POST)
    @ResponseBody
    public HttpEntity<HashMap<String,String>> returnKey(HttpServletRequest request, @Valid @RequestBody MeetingProposal meetingProposal) throws  Exception{
        if (meetingProposal != null){
            meetingProposal.generateAdminKey();
            repository.save(meetingProposal);
            meetingProposal.sendAdminKey(mailUtils);
            HashMap<String, String > response = new HashMap<>();
            response.put("adminKey", meetingProposal.getAdminKey());
            return ResponseEntity.created(URI.create(request.getRequestURL() + "/" + meetingProposal.getId().toString())).body(response);
        } else {
            throw new NullPointerException();
        }
    }

    @RequestMapping(value = "/meetingProposals/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public HttpEntity<MeetingProposal> updateMeeting(@PathVariable String id, @Valid @RequestBody MeetingProposal meetingProposal, @RequestParam(value = "key", required = false) String key) throws  Exception{
        MeetingProposal oldMeeting = repository.findOne(UUID.fromString(id));
        if (oldMeeting != null){
            if (!oldMeeting.isAdmin(key))
                throw new InvalidKeyException();
            oldMeeting.setTitle(meetingProposal.getTitle());
            oldMeeting.setDescription(meetingProposal.getDescription());
            oldMeeting.setOrganizer(meetingProposal.getOrganizer());
            oldMeeting.setSlotDuration(meetingProposal.getSlotDuration());
            repository.save(oldMeeting);
            return ResponseEntity.ok().body(oldMeeting);
        } else {
            throw new NullPointerException();
        }
    }

    @RequestMapping(value = "/meetingProposals/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public HttpEntity<Void> deleteMeeting(@PathVariable String id, @RequestParam(value = "key", required = false) String key) throws  Exception{
        MeetingProposal meetingProposal = repository.findOne(UUID.fromString(id));
        if (meetingProposal != null){
            if (!meetingProposal.isAdmin(key))
                throw new InvalidKeyException();
            repository.delete(UUID.fromString(id));
            return ResponseEntity.ok().build();
        } else {
            throw new NullPointerException();
        }
    }
}
