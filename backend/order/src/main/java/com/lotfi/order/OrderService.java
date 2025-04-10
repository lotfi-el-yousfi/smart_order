package com.lotfi.order;

import java.util.List;

public interface OrderService {
    List<OrderDto> getAll();
    OrderDto create(OrderDto dto);

    List<OrderDto> findOrderById(Long id);

    Long  save(OrderDto dto);
}
