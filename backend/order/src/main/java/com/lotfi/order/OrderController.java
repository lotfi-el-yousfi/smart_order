package com.lotfi.order;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @GetMapping
    public List<OrderDto> getAll() {
        return service.getAll();
    }

    @PostMapping
    public OrderDto create(@RequestBody OrderDto dto) {
        return service.create(dto);
    }
}
