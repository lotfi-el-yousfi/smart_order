 

import org.mapstruct.Mapper;
import com.example.dto.UserDto;
import com.example.domain.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User entity);
    User toEntity(UserDto dto);
}
