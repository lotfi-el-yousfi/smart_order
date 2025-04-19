package com.lotfi.product;

import java.util.List;

public interface ProductService {


    List<Product> Listallproducts();

    Product GetproductdetailsbyID(int id);

    List<ProductDto> SearchByNameCategoryPrice();

    int AddNewProduct(ProductDto dto);

    int UpdateProduct(int id, Product  dto);

    void DeleteProduct(int id);
}
