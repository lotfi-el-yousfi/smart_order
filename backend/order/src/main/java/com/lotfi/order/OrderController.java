package com.lotfi.order;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    private final OrderServiceImpl service;

    public OrderController(OrderServiceImpl service) {
        this.service = service;
    }

    @GetMapping("/list")
    public List<OrderDto> getAll() {
        return service.getAll();
    }

    @PostMapping("/new")
    public OrderDto create(@RequestBody OrderDto dto) {
        return service.create(dto);
    }

    @GetMapping("/{id}")
    public List<OrderDto> getOrderById(@PathVariable Long id) {
        return service.findOrderById(id);
    }

    @PostMapping("/update/{id}")
    public Long createNewOrder(@PathVariable Long id
            , @RequestBody OrderDto dto) {
        return service.save(dto);
    }

}
