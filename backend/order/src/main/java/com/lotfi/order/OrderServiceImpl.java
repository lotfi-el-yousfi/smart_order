package com.lotfi.order;


import com.lotfi.order.dtos.OrderCreateDTO;
import com.lotfi.order.dtos.OrderResponseDTO;
import com.lotfi.order.dtos.OrderUpdateDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository repo;
    private final OrderMapper mapper;

    public OrderServiceImpl(OrderRepository repo, OrderMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }


    @Override
    public List<OrderResponseDTO> getAllOrders() {
        return repo.findAll().stream().map(mapper::toResponseDTO).collect(Collectors.toList());
    }

    @Override
    public OrderResponseDTO getOrderById(Long id) {
        return mapper.toResponseDTO(repo.findOrderById(id));
    }

    @Override
    public OrderResponseDTO createOrder(OrderCreateDTO dto) {
        return mapper.toResponseDTO(repo.save(mapper.toEntity(dto)));
    }

    @Override
    public OrderResponseDTO updateOrder(Long id, OrderCreateDTO dto) {
        return mapper.toResponseDTO(repo.save(mapper.toEntity(dto)));
    }

    @Override
    public void deleteOrder(Long id) {
        repo.deleteById(id);
    }


}
