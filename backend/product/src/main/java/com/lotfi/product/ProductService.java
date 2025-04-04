package com.lotfi.product;

import com.example.dto.ProductDto;
import java.util.List;

public interface ProductService {
    List<ProductDto> getAll();
    ProductDto create(ProductDto dto);
}
