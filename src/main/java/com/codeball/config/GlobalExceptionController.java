package com.codeball.config;

import com.codeball.exceptions.*;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

/**
 * Global exception controller for the application.
 */
@ControllerAdvice
public class GlobalExceptionController {

    private static final Logger LOGGER = Logger.getLogger(GlobalExceptionController.class);

    private static final int MAX_EXCEPTION_ROOT_DEPTH = 50;

    private static String getUnwrappedRootCauseMessage(Throwable throwable, int depth) {
        if (throwable.getCause() != null && depth < MAX_EXCEPTION_ROOT_DEPTH) {
            return GlobalExceptionController.getUnwrappedRootCauseMessage(throwable.getCause(), depth + 1);
        }
        return throwable.getMessage();
    }

    /**
     * Logs bad request exceptions
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({NoLastGameException.class, NoUpcomingGameException.class})
    @ResponseBody
    public MessageWrapper logNoGameFoundException(HttpServletRequest request, Exception exception) {
        return new MessageWrapper(exception.getMessage(), true);
    }

    /**
     * Logs not found request exceptions
     */
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({ResourceNotFoundException.class})
    @ResponseBody
    public MessageWrapper logNotFoundException(HttpServletRequest request, Exception exception) {
        return new MessageWrapper(exception.getMessage());
    }

    /**
     * Logs bad request exceptions
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({EnrollmentOverException.class, GameOverException.class, UserEmailAlreadyExistsException.class, GameNotFoundException.class})
    @ResponseBody
    public MessageWrapper logBadRequestException(HttpServletRequest request, Exception exception) {
        LOGGER.error("Exception: " + exception + this.getAdditionalRequestContextInfo(request));
        return new MessageWrapper(exception.getMessage());
    }

    /**
     * Logs authentication exceptions
     */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({AuthenticationException.class})
    @ResponseBody
    public MessageWrapper logAuthenticationException(HttpServletRequest request, Exception exception) {
        LOGGER.error("Exception: " + exception + this.getAdditionalRequestContextInfo(request));
        return new MessageWrapper(exception.getMessage());
    }

    /**
     * Logs authentication exceptions
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({HttpMessageNotReadableException.class})
    @ResponseBody
    public MessageWrapper logJsonFormatException(HttpServletRequest request, Exception exception) {
        LOGGER.error("Exception: " + exception + this.getAdditionalRequestContextInfo(request));
        return new MessageWrapper("Unacceptable JSON format");
    }



    private String getAdditionalRequestContextInfo(HttpServletRequest request) {
        final String contextPath = request.getContextPath();
        if (contextPath == null || contextPath.isEmpty()) {
            return "";
        } else {
            return "\nRequest context: " + contextPath;
        }
    }

    /**
     * Wrapper class for holding messages - for Jackson to create Json from them
     */
    private static class MessageWrapper {

        public boolean isSilent = false;
        public String message;

        MessageWrapper(String message) {
            this.message = message;
        }

        MessageWrapper(String message, boolean isSilent) {
            this.message = message;
            this.isSilent = isSilent;
        }

    }

}