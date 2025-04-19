package com.lotfi.product;


import com.lotfi.product.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<Product> Listallproducts() {
        return repo.findAll()
//                .stream()
//                .map(mapper::toDto).collect(Collectors.toList())
                ;
    }

    @Override
    public Product GetproductdetailsbyID(int id) {
        return repo.findProductById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product with ID " + id + " not found"));

    }

    @Override
    public List<ProductDto> SearchByNameCategoryPrice() {
        return List.of();
    }

    @Override
    public int AddNewProduct(ProductDto dto) {

        return repo.save(mapper.toEntity(dto)).getId();
    }

    @Override
    public int UpdateProduct(int id, Product product) {
        if (!repo.existsById(id)) {
            throw new ResourceNotFoundException("Product with ID " + id + " not found");
        }
        return repo.save(product).getId();
    }

    @Override
    public void DeleteProduct(int id) {
        repo.deleteById(id);

    }
}
