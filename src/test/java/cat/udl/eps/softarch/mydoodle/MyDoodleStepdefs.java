package cat.udl.eps.softarch.mydoodle;

import cat.udl.eps.softarch.mydoodle.config.ApplicationConfig;
import cat.udl.eps.softarch.mydoodle.config.TestMailConfig;
import cat.udl.eps.softarch.mydoodle.model.MeetingProposal;
import cat.udl.eps.softarch.mydoodle.model.ParticipantAvailability;
import cat.udl.eps.softarch.mydoodle.repository.MeetingProposalRepository;
import cat.udl.eps.softarch.mydoodle.utils.MailUtils;
import com.jayway.jsonpath.JsonPath;
import cucumber.api.DataTable;
import cucumber.api.PendingException;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import javafx.util.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static junit.framework.TestCase.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Created by http://rhizomik.net/~roberto/
 */

@WebAppConfiguration
@ContextConfiguration(classes = {ApplicationConfig.class, TestMailConfig.class})
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class MyDoodleStepdefs {
    private static final Logger logger = LoggerFactory.getLogger(MyDoodleStepdefs.class);

    @Autowired
    private WebApplicationContext wac;
    private String id;
    private String idM;
    
    private MockMvc       mockMvc;
    private ResultActions result;
    private MeetingProposal proposal;

    @Autowired
    private MeetingProposalRepository meetingRepos;
    @Autowired
    private MailUtils mailUtils;

    private UUID auxiliarId;

    @Before
    public void setup() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(this.wac)
                .build();
    }

    @After
    public void tearDown() throws Exception {
    }

    @When("^the organizer creates a meeting proposal with title \"([^\"]*)\", description \"([^\"]*)\", organizer \"([^\"]*)\" and slot duration \"([^\"]*)\"$")
    public void the_organizer_creates_a_meeting_proposal_with_title_description_organizer_and_slot_duration(String title, String description, String orgEmail, int slotDuration) throws Throwable {
        result = mockMvc.perform(post("/meetingProposals")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"title\": \"" + title + "\"" +
                        ", \"description\": \"" + description + "\"" +
                        ", \"organizer\": \"" + orgEmail + "\"" +
                        ", \"slotDuration\": " + slotDuration +
                        "}")
                .accept(MediaType.APPLICATION_JSON));
    }

    @Then("^the response is status code (\\d+)$")
    public void the_response_is_status_code(int statusCode) throws Throwable {
        result.andExpect(status().is(statusCode));
    }

    @And("^header \"([^\"]*)\" points to a proposal meeting with title \"([^\"]*)\", description \"([^\"]*)\", organizer \"([^\"]*)\"$")
    public void header_points_to_a_proposal_meeting_with_title_description_organizer(String header, String title, String description, String organizer) throws Throwable {
        String location = result.andReturn().getResponse().getHeader(header);
        ResultActions result2 = mockMvc.perform(get(location).accept(MediaType.APPLICATION_JSON));
        result2.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.title", is(title)))
                .andExpect(jsonPath("$.description", is(description)))
                .andExpect(jsonPath("$.organizer", is(organizer)));
    }

    @And("^header \"([^\"]*)\" points to a proposal meeting which has a \"([^\"]*)\" list containing \"([^\"]*)\" elements")
    public void header_points_to_a_proposal_meeting_with_a_list_of_with(String header, String fieldName, int numElements) throws Throwable {
        String location = result.andReturn().getResponse().getHeader(header);
        ResultActions result2 = mockMvc.perform(get(location).accept(MediaType.APPLICATION_JSON));
        result2.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
        String targetURL = JsonPath.read(result2.andReturn().getResponse().getContentAsString(), "$._links." + fieldName + ".href");
        ResultActions result3 = mockMvc.perform(get(targetURL).accept(MediaType.APPLICATION_JSON));
        result3.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$._embedded.[?(@=~/" + fieldName + "/i)]", hasSize(numElements)));
    }

    @And("^error message contains \"([^\"]*)\"$")
    public void error_message_contains(String message) throws Throwable {
        // Express the Regexp above with the code you wish you had
        result.andExpect(jsonPath("$.message", containsString(message)));
    }

    @And("^adds a participant with \"([^\"]*)\" email$")
    public void adds_a_participant_with_email(String email) throws Throwable {
        // Express the Regexp above with the code you wish you had
        String location = result.andReturn().getResponse().getHeader("Location");
        id = location.split("/")[location.split("/").length-1];
        result = mockMvc.perform(post("/participantAvailabilities")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"participant\": \"" + email + "\"" +
                        ", \"meetingId\": \"" + id + "\"" +
                        "}")
                .accept(MediaType.APPLICATION_JSON));

        //assertThat(id, is(email));
        //throw new PendingException();
    }

    @Then("^the participant has the email \"([^\"]*)\" and meeting associated$")
    public void the_participant_has_the_email_and_meeting_associated(String participant) throws Throwable {
        // Express the Regexp above with the code you wish you had
        String location = result.andReturn().getResponse().getHeader("Location");
        ResultActions result2 = mockMvc.perform(get(location).accept(MediaType.APPLICATION_JSON));
        result2.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.participant", is(participant)));

    }
    @When("^the organizer has created a meeting proposal with title \"([^\"]*)\", description \"([^\"]*)\", organizer \"([^\"]*)\" and slot duration \"([^\"]*)\"$")
    public void the_organizer_has_created_a_meeting_proposal_with_title_description_organizer_and_slot_duration(String Title, String Description, String email, String timeSlot) throws Throwable {
        // Express the Regexp above with the code you wish you had
        this.proposal = new MeetingProposal(Title,Description,email,Integer.parseInt(timeSlot));


    }



    @And("^has added participant with \"([^\"]*)\" email$")
    public void has_added_participant_with_email(String email) throws Throwable {
        // Express the Regexp above with the code you wish you had
        ParticipantAvailability participant = new ParticipantAvailability();
        participant.setParticipant(email);
        this.proposal.getAvailabilities().add(participant);

    }


    @Then("^the response is a list with: \"([^\"]*)\" and \"([^\"]*)\"$")
    public void the_response_is_a_list_with_and(String email, String url) throws Throwable {
        // Express the Regexp above with the code you wish you had
        java.util.List<Pair<String, String>> list = this.proposal.sendParticipantKeys(mailUtils);
        assertThat((list.get(0).getKey()), is(email));
        assertThat((list.get(0).getValue()),is(url));
    }

    @Then("^the response is a list with item (\\d+): \"([^\"]*)\" and \"([^\"]*)\"$")
    public void the_response_is_a_list_with_item_and(int item, String email, String url) throws Throwable {
        // Express the Regexp above with the code you wish you had
        java.util.List<Pair<String, String>> list = this.proposal.sendParticipantKeys(mailUtils);
        assertThat((list.get(item).getKey()), is(email));
        assertThat((list.get(item).getValue()), is(url));
    }

    @Then("^the response is a null list$")
    public void the_response_is_a_null_list() throws Throwable {
        // Express the Regexp above with the code you wish you had
        java.util.List<Pair<String, String>> list = this.proposal.sendParticipantKeys(mailUtils);
        assertThat(list.size(), is(0));
    }

    @Given("^the meeting repository has the following meeting:$")
    public void the_meeting_repository_has_the_following_meeting(DataTable MeetingProposal) throws Throwable {
         for (MeetingProposal m : MeetingProposal.asList(MeetingProposal.class)){
             if(!meetingRepos.exists(m.getId()))
                 meetingRepos.save(m);
         }

        throw new PendingException();
    }

    @When("^the organizer add a new time slot \"([^\"]*)\" and associated meeting proposal with id \"([^\"]*)\"$")
    public void the_organizer_add_a_new_time_slot_and_associated_meeting_proposal_with_id(Date date, int id) throws Throwable {
        result=mockMvc.perform(post("/timeSlots")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"date\": \"" + date + "\" }")
                .content("( \"MeetingProposal\": \"" + id + "\")")
                .accept(MediaType.APPLICATION_JSON));

        throw new PendingException();
    }

    @Given("^the meetingsProposal repository has the following meetingProposals:$")
    public void the_MeetingProposals_repository_has_the_following_MeetingProposals(List<MeetingProposal> MeetingProposals) throws Throwable {
        for (MeetingProposal g: MeetingProposals) {
            meetingRepos.save(g);
        }
    }

    @When("^the participant views a \"([^\"]*)\" meeting proposal$")
    public void the_participant_view_a_existing_meeting_proposal_with_correct_acces(String typeId) throws Throwable {
        UUID id = (typeId.equals("existent")) ? meetingRepos.findAll().iterator().next().getId() : auxiliarId;
        result = mockMvc.perform(get("/meetingProposals/{id}", id.toString()).accept(MediaType.APPLICATION_JSON));
    }

    @Then("^the response is a meetingProposal with title \"([^\"]*)\"$")
    public void response_is_meeting_proposal_with_title_content(String title) throws Throwable{
        result.andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.title").value(is(title)));
    }

    @Given("^meetingProposal with random id doesn't exist$")
    public void meeting_proposal_random_not_exists() throws Throwable {
        auxiliarId = UUID.randomUUID();
        assertFalse(meetingRepos.exists(auxiliarId));
    }

    @And("^adds a participant with \"([^\"]*)\" email$")
    public void adds_a_participant_with_email(String email) throws Throwable {
        // Express the Regexp above with the code you wish you had
        String location = result.andReturn().getResponse().getHeader("Location");
        idM = location.split("/")[location.split("/").length-1];
        result = mockMvc.perform(post("/participantAvailabilities")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"participant\": \"" + email + "\"" +
                        ", \"meetingId\": \"" + idM + "\"" +
                        "}")
                .accept(MediaType.APPLICATION_JSON));

        //throw new PendingException();
    }

    @Then("^the participant has the email \"([^\"]*)\" and meeting associated$")
    public void the_participant_has_the_email_and_meeting_associated(String participant) throws Throwable {
        // Express the Regexp above with the code you wish you had
        String location = result.andReturn().getResponse().getHeader("Location");
        ResultActions result2 = mockMvc.perform(get(location).accept(MediaType.APPLICATION_JSON));
        result2.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.participant", is(participant)))
                .andExpect(jsonPath("$.meetingId",is(idM)));

    }


    @And("^adds a participant without email$")
    public void adds_a_participant_without_email() throws Throwable {
        // Express the Regexp above with the code you wish you had
        String location = result.andReturn().getResponse().getHeader("Location");
        idM = location.split("/")[location.split("/").length-1];
        result = mockMvc.perform(post("/participantAvailabilities")
                .contentType(MediaType.APPLICATION_JSON)
                .content("email" + "" + "\"" +
                        ", \"meetingId\": \"" + idM + "\"" +
                        "}")
                .accept(MediaType.APPLICATION_JSON));

        //throw new PendingException();
    }
}
