package com.karizma.hackathon.exception;

public class UnauthorizedException extends BusinessException{

    public UnauthorizedException() {
        super();
    }

    public UnauthorizedException(String defaultMessage, String key, Object[] args) {
        super(defaultMessage, key, args);
    }

    public UnauthorizedException(String defaultMessage, Throwable cause, String key, Object[] args) {
        super(defaultMessage, cause, key, args);
    }

    public UnauthorizedException(Throwable cause, String key, Object[] args) {
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
