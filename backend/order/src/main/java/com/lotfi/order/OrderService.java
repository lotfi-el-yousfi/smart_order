 

import com.example.dto.OrderDto;
import java.util.List;

public interface OrderService {
    List<OrderDto> getAll();
    OrderDto create(OrderDto dto);
}
