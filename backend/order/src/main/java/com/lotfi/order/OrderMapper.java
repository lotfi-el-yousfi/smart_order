package com.lotfi.order;


import org.mapstruct.Mapper;

@Mapper  (componentModel = "spring")
public interface OrderMapper {
    OrderDto toDto(Order entity);

    Order toEntity(OrderDto dto);
}
