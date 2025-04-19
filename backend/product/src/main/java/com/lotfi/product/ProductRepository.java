package com.lotfi.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    void deleteById(int id);

    Optional<Product> findProductById(int id);
}
