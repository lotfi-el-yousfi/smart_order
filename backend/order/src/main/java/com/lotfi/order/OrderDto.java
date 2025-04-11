package com.lotfi.order;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class OrderDto {
    private Long id;
    private String name;
    private Double price;
    private String status;
    private String user_;
    private String product;
}