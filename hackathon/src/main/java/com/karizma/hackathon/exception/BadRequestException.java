package com.karizma.hackathon.exception;


public class BadRequestException extends BusinessException{

    public BadRequestException() {
        super();
    }

    public BadRequestException(String defaultMessage, String key, Object[] args) {
        super(defaultMessage, key, args);
    }

    public BadRequestException(String defaultMessage, Throwable cause, String key, Object[] args) {
        super(defaultMessage, cause, key, args);
    }

    public BadRequestException(Throwable cause, String key, Object[] args) {
        super(cause, key, args);
    }

    @Override
    public String getKey() {
        return super.getKey();
    }

    @Override
    public Object[] getArgs() {
        return super.getArgs();
    }
}
