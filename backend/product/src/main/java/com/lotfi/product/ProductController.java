package com.lotfi.product;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductDto> getAll() {
        return service.getAll();
    }

    @PostMapping
    public ProductDto AddProduct(@RequestBody ProductDto dto) {
        return service.create(dto);
    }

    @PostMapping
    public ProductDto SearchProduct(@RequestBody ProductDto dto) {
        return service.create(dto);
    }


}
