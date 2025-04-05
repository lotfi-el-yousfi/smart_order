package com.lotfi.order;


@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderDto toDto(Order entity);

    Order toEntity(OrderDto dto);
}
