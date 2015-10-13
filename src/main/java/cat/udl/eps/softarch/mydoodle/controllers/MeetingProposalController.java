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
    public @ResponseBody MeetingProposal getMeetingProposal(@PathVariable String id, @RequestParam(value = "key") String key) throws Exception{
        MeetingProposal meetingProposal = repository.findOne(UUID.fromString(id));
        if (meetingProposal.isAdmin(key))
            return  meetingProposal;
        else
            throw new InvalidKeyException();
    }

    @RequestMapping(value = "/meetingProposals", method = RequestMethod.POST)
    @ResponseBody
    public HttpEntity<HashMap<String,String>> returnKey(@RequestBody MeetingProposal meetingProposal) throws  Exception{
        if (meetingProposal != null){
            repository.save(meetingProposal);
            meetingProposal.generateAdminKey();
            meetingProposal.sendAdminKey(mailUtils);
            HashMap<String, String > response = new HashMap<>();
            response.put("adminKey", meetingProposal.getAdminKey());
            return ResponseEntity.created(new URI("/api/meetingProposals/" + meetingProposal.getId())).body(response);
        } else {
            throw new NullPointerException();
        }
    }
}
