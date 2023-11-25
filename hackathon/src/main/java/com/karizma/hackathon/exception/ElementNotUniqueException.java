package com.karizma.hackathon.exception;

public class ElementNotUniqueException extends BusinessException {

    public ElementNotUniqueException() {
        super();
    }

    public ElementNotUniqueException(String defaultMessage, String key, Object[] args) {
        super(defaultMessage, key, args);
    }

    public ElementNotUniqueException(String defaultMessage, Throwable cause, String key, Object[] args) {
        super(defaultMessage, cause, key, args);
    }

    public ElementNotUniqueException(Throwable cause, String key, Object[] args) {
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
