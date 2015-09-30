package cat.udl.eps.softarch.mydoodle.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import javax.annotation.PostConstruct;

/**
 * Created by http://rhizomik.net/~roberto/
 */
@Configuration
public class RestConfig extends RepositoryRestMvcConfiguration {

    @PostConstruct
    public void init() {}
}