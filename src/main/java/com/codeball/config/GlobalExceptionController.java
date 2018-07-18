package com.codeball.config;

import com.codeball.exceptions.*;
import com.codeball.model.responses.ErrorMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Global exception controller for the application.
 */
@ControllerAdvice
public class GlobalExceptionController {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionController.class);

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({NoLastGameException.class, NoUpcomingGameException.class})
    @ResponseBody
    public ErrorMessage logNoGameFoundException(HttpServletRequest request, Exception exception) {
        return new ErrorMessage(exception.getMessage(), true);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({ResourceNotFoundException.class})
    @ResponseBody
    public ErrorMessage logNotFoundException(HttpServletRequest request, Exception exception) {
        return new ErrorMessage(exception.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({EnrollmentOverException.class, GameOverException.class, UserEmailAlreadyExistsException.class, GameNotFoundException.class})
    @ResponseBody
    public ErrorMessage logBadRequestException(HttpServletRequest request, Exception exception) {
        LOGGER.error("Exception: " + exception + this.getAdditionalRequestContextInfo(request));
        return new ErrorMessage(exception.getMessage());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({AuthenticationException.class})
    @ResponseBody
    public ErrorMessage logAuthenticationException(HttpServletRequest request, Exception exception) {
        LOGGER.error("Exception: " + exception + this.getAdditionalRequestContextInfo(request));
        return new ErrorMessage(exception.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({HttpMessageNotReadableException.class, HttpRequestMethodNotSupportedException.class})
    @ResponseBody
    public ErrorMessage logJsonFormatException(HttpServletRequest request, Exception exception) {
        LOGGER.trace("Exception: " + exception + this.getAdditionalRequestContextInfo(request));
        return new ErrorMessage("Unacceptable request format or method");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseBody
    public ErrorMessage logValidationException(HttpServletRequest request, MethodArgumentNotValidException exception) {
        List<ObjectError> validationErrors = exception.getBindingResult().getAllErrors();
        String validationMessage = validationErrors.stream()
                .map(validationError -> validationError.getObjectName() + " -> " + validationError.getDefaultMessage())
                .collect(Collectors.joining(" | "));
        LOGGER.trace("Exception: " + exception + this.getAdditionalRequestContextInfo(request));
        return new ErrorMessage("Validation error: " + validationMessage);
    }

    private String getAdditionalRequestContextInfo(HttpServletRequest request) {
        final String contextPath = request.getContextPath();
        if (contextPath == null || contextPath.isEmpty()) {
            return "";
        } else {
            return "\nRequest context: " + contextPath;
        }
    }

}