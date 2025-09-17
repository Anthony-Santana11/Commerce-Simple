package com.anthony.commercesimple.DTO;

import com.anthony.commercesimple.Enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO para requisição de registro de usuário")
public record RegisterUserRequestDTO (
    @Schema(description = "Nome de usuário (3-10 caracteres)", example = "usuario123", required = true)
    String username, 
    
    @Schema(description = "Senha do usuário (6-400 caracteres)", example = "senha123", required = true)
    String password, 
    
    @Schema(description = "Email do usuário", example = "usuario@email.com", required = true)
    String email, 
    
    @Schema(description = "Nome completo do usuário", example = "João Silva", required = true)
    String name, 
    
    @Schema(description = "Papel do usuário no sistema", example = "USER", required = true)
    Role role
) {
}
