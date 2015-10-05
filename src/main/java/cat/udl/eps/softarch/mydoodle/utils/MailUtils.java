package cat.udl.eps.softarch.mydoodle.utils;

import com.sun.mail.util.MailSSLSocketFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.security.GeneralSecurityException;
import java.util.Properties;

public class MailUtils {

    private static MailUtils INSTANCE = new MailUtils();

    private String host = "smtp.gmail.com";
    private int port = 587;
    private String username = "mydoodle1516@gmail.com";
    private String password = "softarch1516";

    private JavaMailSenderImpl mailSender;

    public static MailUtils getInstance(){
        return INSTANCE;
    }

    private MailUtils() {
        this.mailSender = new JavaMailSenderImpl();
        configMailSender();
    }

    private void configMailSender(){
        this.mailSender.setHost(host);
        this.mailSender.setPort(port);
        this.mailSender.setUsername(username);
        this.mailSender.setPassword(password);

        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        MailSSLSocketFactory sf = null;
        try {
            sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(true);
            properties.put("mail.smtp.ssl.socketFactory", sf);
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        }

        this.mailSender.setJavaMailProperties(properties);
    }

    public void sendMessage(String to, String subject, String message){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(username);
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }
}
