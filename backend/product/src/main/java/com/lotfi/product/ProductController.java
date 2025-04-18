package com.lotfi.product;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductServiceImpl service;

    public ProductController(ProductServiceImpl service) {
        this.service = service;
    }


    @GetMapping("/list")
    public ResponseEntity<List<Product>> Listallproducts() {
        return ResponseEntity.ok().body(service.Listallproducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> GetproductdetailsbyID(@PathVariable int  id) {
        return ResponseEntity.ok().body(service.GetproductdetailsbyID(id));
    }

    @PostMapping("/search")
    public ResponseEntity<List<ProductDto>> SearchByNameCategoryPrice() {
        return ResponseEntity.ok().body(service.SearchByNameCategoryPrice());
    }

    @PostMapping("/new")
    public ResponseEntity<Integer> AddNewProduct(@RequestBody ProductDto dto) {
        return ResponseEntity.ok().body(service.AddNewProduct(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Integer> UpdateProduct(@PathVariable int id,
                                                 @RequestBody ProductDto dto) {
        return ResponseEntity.ok().body(service.UpdateProduct(id, dto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> DeleteProduct(@PathVariable int  id) {
        service.DeleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}

