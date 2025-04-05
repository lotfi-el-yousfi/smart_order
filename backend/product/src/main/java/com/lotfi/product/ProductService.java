package com.lotfi.product;

import java.util.List;

public interface ProductService {


    List<ProductDto> Listallproducts();

    Product GetproductdetailsbyID(Long id);

    List<ProductDto> SearchByNameCategoryPrice();

    Long AddNewProduct(ProductDto dto);

    Long UpdateProduct(int id, ProductDto dto);

    void DeleteProduct(int id);
}
