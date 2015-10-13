package cat.udl.eps.softarch.mydoodle.model;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "key", types = MeetingProposal.class)
public interface KeyProposalProjection {
    String getAdminKey();
}
