package com.lotfi.product;
 
import java.util.List;

public interface ProductService {
    List<ProductDto> getAll();
    ProductDto create(ProductDto dto);
}
