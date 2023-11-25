package com.karizma.hackathon.utils;

import com.karizma.hackathon.dto.GenericDto;
import com.karizma.hackathon.model.GenericEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MapHelper {
    private final ModelMapper modelMapper;

    public MapHelper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public <T extends GenericEntity, D extends GenericDto> T convertToEntity(D source, Class<T> targetClass) {
        return modelMapper.map(source, targetClass);
    }

    public <T extends GenericEntity, D extends GenericDto> D convertToDto(T source, Class<D> targetClass) {
        return modelMapper.map(source, targetClass);
    }

    public <T extends GenericEntity, D extends GenericDto> List<D> convertListToDto(final List<T> entities, Class<D> targetClass) {
        return entities.stream()
                .map(entity -> convertToDto(entity, targetClass))
                .collect(Collectors.toList());
    }

    public <S, D> void mapWithSkipNull(S sourceObject, D destinationObject) {
        // Save the original skipNullEnabled value
        boolean originalSkipNullEnabled = modelMapper.getConfiguration().isSkipNullEnabled();

        // Set skipNullEnabled to true for this mapping operation
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(sourceObject, destinationObject);

        // Set skipNullEnabled back to its original value
        modelMapper.getConfiguration().setSkipNullEnabled(originalSkipNullEnabled);
    }

    public <S, D> void map(S sourceObject, D destinationObject) {
        modelMapper.map(sourceObject, destinationObject);
    }

}
