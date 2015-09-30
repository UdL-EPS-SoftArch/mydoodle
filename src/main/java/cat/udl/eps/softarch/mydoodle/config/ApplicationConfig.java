package cat.udl.eps.softarch.mydoodle.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.orm.jpa.JpaDialect;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaDialect;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * Created by http://rhizomik.net/~roberto/
 */

@Configuration
@ComponentScan("cat.udl.eps.softarch.mydoodle")
@EnableJpaRepositories("cat.udl.eps.softarch.mydoodle.repository")
@EnableTransactionManagement
@PropertySource("classpath:application.properties")
public class ApplicationConfig extends WebMvcConfigurerAdapter{

    @Autowired
    private Environment env;

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        if (System.getenv("DATABASE_URL")!=null && System.getenv("DATABASE_URL").startsWith("postgres")) {
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            URI dbUri = new URI(System.getenv("DATABASE_URL"));
            String username = dbUri.getUserInfo().split(":")[0];
            String password = dbUri.getUserInfo().split(":")[1];
            String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + dbUri.getPath();
            dataSource.setDriverClassName("org.postgresql.Driver");
            dataSource.setUrl(dbUrl);
            dataSource.setUsername(username);
            dataSource.setPassword(password);
            return dataSource;
        } else if (env.getProperty("database.type").equals("hsqldb-file")) {
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setDriverClassName("org.hsqldb.jdbcDriver");
            dataSource.setUrl("jdbc:hsqldb:file:~/hsql/db");
            return dataSource;
        } else {
            EmbeddedDatabaseBuilder builder = new EmbeddedDatabaseBuilder();
            return builder.setType(EmbeddedDatabaseType.HSQL).build();
        }
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() throws URISyntaxException {
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        if (System.getenv("DATABASE_URL")!=null && System.getenv("DATABASE_URL").startsWith("postgres")) {
            vendorAdapter.setDatabase(Database.POSTGRESQL);
            vendorAdapter.setDatabasePlatform("org.hibernate.dialect.PostgreSQLDialect");
            vendorAdapter.setGenerateDdl(true);
            vendorAdapter.setShowSql(true);
        }
        else {
            vendorAdapter.setDatabase(Database.HSQL);
            vendorAdapter.setGenerateDdl(true);
        }
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setPackagesToScan("cat.udl.eps.softarch.mydoodle");
        factory.setDataSource(dataSource());
        return factory;
    }

    @Bean
    public PlatformTransactionManager transactionManager() throws URISyntaxException {
        JpaDialect jpaDialect = new HibernateJpaDialect();
        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory().getObject());
        txManager.setJpaDialect(jpaDialect);
        return txManager;
    }
}
