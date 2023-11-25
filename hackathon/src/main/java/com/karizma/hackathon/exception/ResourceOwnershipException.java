package com.karizma.hackathon.exception;

public class ResourceOwnershipException extends BusinessException{

    public ResourceOwnershipException() {
        super();
    }

    public ResourceOwnershipException(String defaultMessage, String key, Object[] args) {
        super(defaultMessage, key, args);
    }

    public ResourceOwnershipException(String defaultMessage, Throwable cause, String key, Object[] args) {
        super(defaultMessage, cause, key, args);
    }

    public ResourceOwnershipException(Throwable cause, String key, Object[] args) {
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
