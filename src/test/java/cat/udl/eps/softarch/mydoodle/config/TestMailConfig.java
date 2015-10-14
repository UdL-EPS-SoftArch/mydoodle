package cat.udl.eps.softarch.mydoodle.config;

import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;

@Configuration

public class TestMailConfig {
    private static final Logger logger = LoggerFactory.getLogger(TestMailConfig.class);

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSender javaMailSenderMock = mock(JavaMailSenderImpl.class);
        doAnswer(new Answer() {
            @Override
            public Object answer(InvocationOnMock invocationOnMock) throws Throwable {
                SimpleMailMessage mailMessage = (SimpleMailMessage) invocationOnMock.getArguments()[0];
                logger.info("Mock JavaMailSender sending e-mail: {}", mailMessage);
                return null;
            }
        }).when(javaMailSenderMock).send(any(SimpleMailMessage.class));
        return javaMailSenderMock;
    }
}
