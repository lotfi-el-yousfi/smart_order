 

import com.example.dto.UserDto;
import java.util.List;

public interface UserService {
    List<UserDto> getAll();
    UserDto create(UserDto dto);
}
