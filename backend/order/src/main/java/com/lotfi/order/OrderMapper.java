 

import org.mapstruct.Mapper;
import com.example.dto.OrderDto;
import com.example.domain.Order;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderDto toDto(Order entity);
    Order toEntity(OrderDto dto);
}
