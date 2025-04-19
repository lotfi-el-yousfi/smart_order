package com.lotfi.order.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreateDTO {
    private String name;
    private Double price;
    private String status;
    private String user_;
    private String product;
}
