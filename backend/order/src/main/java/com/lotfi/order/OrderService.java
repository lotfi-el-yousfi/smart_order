package com.lotfi.order;

import com.lotfi.order.dtos.OrderCreateDTO;
import com.lotfi.order.dtos.OrderResponseDTO;
import com.lotfi.order.dtos.OrderUpdateDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    List<OrderResponseDTO> getAllOrders();

    OrderResponseDTO getOrderById(Long id);

    OrderResponseDTO createOrder(OrderCreateDTO dto);

    OrderResponseDTO updateOrder(Long id, OrderCreateDTO dto);

    void deleteOrder(Long id);
}
