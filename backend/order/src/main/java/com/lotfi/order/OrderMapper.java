package com.lotfi.order;


import com.lotfi.order.dtos.OrderCreateDTO;
import com.lotfi.order.dtos.OrderResponseDTO;
import com.lotfi.order.dtos.OrderUpdateDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderResponseDTO toResponseDTO(Order order);

    List<OrderResponseDTO> toResponseDTOList(List<Order> orders);

    Order toEntity(OrderCreateDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDTO(OrderUpdateDTO dto, @MappingTarget Order order);


}
