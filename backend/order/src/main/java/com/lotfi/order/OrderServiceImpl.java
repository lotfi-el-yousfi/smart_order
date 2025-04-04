 

import com.example.repository.OrderRepository;
import com.example.dto.OrderDto;
import com.example.domain.Order;
import com.example.mapper.OrderMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository repo;
    private final OrderMapper mapper;

    public OrderServiceImpl(OrderRepository repo, OrderMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Override
    public List<OrderDto> getAll() {
        return repo.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public OrderDto create(OrderDto dto) {
        Order entity = mapper.toEntity(dto);
        return mapper.toDto(repo.save(entity));
    }
}
