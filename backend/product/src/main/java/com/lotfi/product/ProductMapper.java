package com.lotfi.product;

import org.mapstruct.Mapper;
import com.example.dto.ProductDto;
import com.example.domain.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDto toDto(Product entity);
    Product toEntity(ProductDto dto);
}
