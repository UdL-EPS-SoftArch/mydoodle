package cat.udl.eps.softarch.mydoodle.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.domain.Persistable;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.UUID;

/**
 * Created by http://rhizomik.net/~roberto/
 */
@MappedSuperclass
public abstract class UUIDEntity implements Persistable<UUID> {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private UUID uuid;

    @Override
    public UUID getId() {
        return uuid;
    }

    @Override
    @JsonIgnore
    public boolean isNew() {
        return uuid == null;
    }

    @Override
    public boolean equals(Object obj) {

        if (obj == null)
            return false;
        if (this == obj)
            return true;
        if (!getClass().equals(obj.getClass()))
            return false;
        UUIDEntity uuidEntity = (UUIDEntity) obj;
        return this.uuid != null && this.uuid.equals(uuidEntity.getId());
    }

    @Override
    public int hashCode() {
        int hashCode = 17;
        hashCode += (this.uuid == null) ? 0 : this.uuid.hashCode() * 31;
        return hashCode;
    }
}
