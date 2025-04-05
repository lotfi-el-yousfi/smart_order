package com.lotfi.product;


import com.lotfi.product.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository repo;
    private final ProductMapper mapper;

    public ProductServiceImpl(ProductRepository repo,
                              ProductMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Override
    public List<ProductDto> Listallproducts() {
        return repo.findAll().stream()
                .map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public Product GetproductdetailsbyID(Long id) {
        return repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product with ID " + id + " not found"));

    }

    @Override
    public List<ProductDto> SearchByNameCategoryPrice() {
        return List.of();
    }

    @Override
    public Long AddNewProduct(ProductDto dto) {

        return repo.save(mapper.toEntity(dto)).getId();
    }

    @Override
    public Long UpdateProduct(int id, ProductDto product) {
        return repo.save(mapper.toEntity(product)).getId();
    }

    @Override
    public void DeleteProduct(int id) {
        repo.deleteById(
                Long.valueOf(id)
        );

    }
}
