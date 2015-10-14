package cat.udl.eps.softarch.mydoodle.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class InvalidKeyException extends RuntimeException {

    public InvalidKeyException(){
        this("Provided key doesn't have enough permissions to complete this request");
    }


    public InvalidKeyException(String message) {
        this(message, null);
    }

    public InvalidKeyException(String message, Throwable cause) {
        super(message,cause);
    }
}
