package com.karizma.hackathon.service;

import com.karizma.hackathon.exception.BusinessException;
import com.karizma.hackathon.exception.ElementAlreadyExistsException;
import com.karizma.hackathon.exception.ElementNotFoundException;
import com.karizma.hackathon.model.GenericEntity;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GenericService<T extends GenericEntity> {

    T update(final Long id, final T entity) throws ElementNotFoundException;

    <S extends Object> T patch(Long id, S patch) throws ElementNotFoundException;


    T findById(final Long id) throws ElementNotFoundException;

    T save(final T entity) throws ElementAlreadyExistsException;

    boolean delete(final Long id) throws ElementNotFoundException;

    int getTotalPages(final int pageSize);

    List<T> search(String keyword, Pageable pageable) throws BusinessException;


}
