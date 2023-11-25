package com.karizma.hackathon.dto;


import com.karizma.hackathon.common.CoreConstant;
import com.karizma.hackathon.exception.BadRequestException;
import lombok.*;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchDto implements Serializable {

    private String keyword;

    private Integer page;
    private Integer size;

    public Integer getPage() {
        return (Objects.isNull(page) ? CoreConstant.Pagination.DEFAULT_PAGE_NUMBER : page);
    }

    public Integer getSize() {
        return (Objects.isNull(size) ? CoreConstant.Pagination.DEFAULT_PAGE_SIZE : size);
    }

    public String getKeyword() {
        return (Objects.isNull(keyword) ? StringUtils.EMPTY : keyword);
    }

    public void validate() throws BadRequestException {


        if (Objects.nonNull(page))
            if (this.page < 0)
                throw new BadRequestException(null, new BadRequestException(), CoreConstant.Exception.PAGINATION_PAGE_NUMBER, null);

        if (Objects.nonNull(size)) {
            if (this.size <= 0)
                throw new BadRequestException(null, new BadRequestException(), CoreConstant.Exception.PAGINATION_PAGE_SIZE_MIN, null);

            if (this.size > CoreConstant.Pagination.MAX_PAGE_SIZE)
                throw new BadRequestException(null, new BadRequestException(), CoreConstant.Exception.PAGINATION_PAGE_SIZE_MAX, new Object[]{CoreConstant.Pagination.MAX_PAGE_SIZE});
        }
    }
}
