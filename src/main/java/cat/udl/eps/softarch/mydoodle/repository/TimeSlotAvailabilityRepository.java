package cat.udl.eps.softarch.mydoodle.repository;

import cat.udl.eps.softarch.mydoodle.model.TimeSlotAvailability;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

/**
 * Created by http://rhizomik.net/~roberto/
 */

@RepositoryRestResource
public interface TimeSlotAvailabilityRepository extends PagingAndSortingRepository<TimeSlotAvailability, UUID> {}
