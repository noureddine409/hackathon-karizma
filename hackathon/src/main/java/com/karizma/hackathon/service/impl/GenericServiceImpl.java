package com.karizma.hackathon.service.impl;

import com.karizma.hackathon.common.CoreConstant;
import com.karizma.hackathon.exception.BusinessException;
import com.karizma.hackathon.exception.ElementAlreadyExistsException;
import com.karizma.hackathon.exception.ElementNotFoundException;
import com.karizma.hackathon.model.GenericEntity;
import com.karizma.hackathon.repository.GenericRepository;
import com.karizma.hackathon.service.GenericService;
import com.karizma.hackathon.utils.MapHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class GenericServiceImpl<T extends GenericEntity> implements GenericService<T> {
    final Logger LOG = LoggerFactory.getLogger(GenericServiceImpl.class);
    private final GenericRepository<T> genericRepository;

    private final MapHelper mapHelper;

    public GenericServiceImpl(GenericRepository<T> genericRepository, MapHelper mapHelper) {
        this.genericRepository = genericRepository;
        this.mapHelper = mapHelper;
    }

    @Override
    public List<T> search(String keyword, Pageable pageable) throws BusinessException {
        try {
            return genericRepository.searchByKeyword(keyword, pageable).toList();
        } catch (BusinessException e) {
            throw new BusinessException(null, e, CoreConstant.Exception.FIND_ELEMENTS, null);

        }

    }


    @Override
    public T update(Long id, T entity) throws ElementNotFoundException {
        final Optional<T> foundEntity = genericRepository.findById(id);

        if (foundEntity.isEmpty()) {
            LOG.warn(CoreConstant.Exception.NOT_FOUND);
            throw new ElementNotFoundException(null, new ElementNotFoundException(), CoreConstant.Exception.NOT_FOUND, new Object[]{id});
        }
        T newEntity = foundEntity.get();
        entity.setCreatedAt(newEntity.getCreatedAt());
        mapHelper.map(entity, newEntity);
        newEntity.setId(id);
        newEntity.setUpdatedAt(LocalDateTime.now());

        return genericRepository.save(newEntity);
    }

    @Override
    public <S> T patch(Long id, S patch) throws ElementNotFoundException {
        T entity = this.findById(id);
        mapHelper.mapWithSkipNull(patch, entity);
        return genericRepository.save(entity);
    }


    @Override
    public T findById(Long id) throws ElementNotFoundException {
        final Optional<T> entityExist = genericRepository.findById(id);
        if (entityExist.isPresent()) {
            return entityExist.get();
        } else {
            LOG.warn(CoreConstant.Exception.NOT_FOUND);
            throw new ElementNotFoundException(null, new ElementNotFoundException(), CoreConstant.Exception.NOT_FOUND, new Object[]{id});
        }
    }

    @Override
    public T save(T entity) throws ElementAlreadyExistsException {
        final Long id = entity.getId();
        if (id == null) {
            entity.setCreatedAt(LocalDateTime.now());
            return genericRepository.save(entity);
        }
        final Optional<T> entityExist = genericRepository.findById(id);
        if (entityExist.isEmpty()) {
            entity.setCreatedAt(LocalDateTime.now());
            return genericRepository.save(entity);
        } else {
            LOG.warn(CoreConstant.Exception.ALREADY_EXISTS);
            throw new ElementAlreadyExistsException(null, new ElementAlreadyExistsException(), CoreConstant.Exception.ALREADY_EXISTS, new Object[]{id});
        }
    }

    @Override
    public boolean delete(Long id) throws ElementNotFoundException {
        try {
            genericRepository.deleteById(id);
            return true;
        } catch (final EmptyResultDataAccessException e) {
            LOG.error("Error", e);
            throw new ElementNotFoundException(null, e, CoreConstant.Exception.NOT_FOUND, new Object[]{id});
        } catch (final DataAccessException ex) {
            throw new BusinessException(null, ex, CoreConstant.Exception.DELETE_ELEMENT, new Object[]{id});
        }
    }

    @Override
    public int getTotalPages(final int pageSize) {
        final long count = genericRepository.count();
        return (int) Math.ceil((double) count / pageSize);
    }

}
