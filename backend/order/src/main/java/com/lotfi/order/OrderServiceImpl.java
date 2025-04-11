package com.lotfi.order;


import ch.qos.logback.core.net.SyslogOutputStream;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public List<OrderDto> getAll() {
        return repo.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public OrderDto create(OrderDto dto) {
        Order entity = mapper.toEntity(dto);
        return mapper.toDto(repo.save(entity));
    }

    @Override
    public List<OrderDto> findOrderById(Long id) {
        return repo.findOrderById(id).stream().map(mapper::toDto).collect(Collectors.toList());

    }

    @Override
    public Long save(OrderDto dto) {
        System.out.println("save   "+ dto);
        return repo.save(mapper.toEntity(dto)).getId();
    }


}
