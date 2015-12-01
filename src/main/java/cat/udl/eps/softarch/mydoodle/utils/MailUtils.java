package cat.udl.eps.softarch.mydoodle.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailUtils {
    private static final Logger logger = LoggerFactory.getLogger(MailUtils.class);

    @Autowired
    public JavaMailSender javaMailSender;

    public void sendMessage(String to, String subject, String message){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        try {
            javaMailSender.send(mailMessage);
        } catch(Exception e) {
            logger.error(e.getMessage());
        }
    }
}
