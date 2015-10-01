package cat.udl.eps.softarch.mydoodle.repository;

import cat.udl.eps.softarch.mydoodle.model.TimeSlot;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

/**
 * Created by http://rhizomik.net/~roberto/
 */

@RepositoryRestResource
public interface TimeSlotRepository extends PagingAndSortingRepository<TimeSlot, UUID> {}
