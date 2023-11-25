package com.karizma.hackathon.exception;


public class ElementAlreadyExistsException extends BusinessException {

    public ElementAlreadyExistsException() {
        super();
    }

    public ElementAlreadyExistsException(String defaultMessage, String key, Object[] args) {
        super(defaultMessage, key, args);
    }

    public ElementAlreadyExistsException(String defaultMessage, Throwable cause, String key, Object[] args) {
        super(defaultMessage, cause, key, args);
    }

    public ElementAlreadyExistsException(Throwable cause, String key, Object[] args) {
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
