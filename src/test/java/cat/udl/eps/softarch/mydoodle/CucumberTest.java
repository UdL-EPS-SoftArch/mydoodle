package cat.udl.eps.softarch.mydoodle;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

/**
 * Created by http://rhizomik.net/~roberto/
 */

@RunWith(Cucumber.class)
@CucumberOptions(plugin={"pretty"}, features="src/test/resources", tags = {})
public class CucumberTest {}
