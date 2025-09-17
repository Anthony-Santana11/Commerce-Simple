package com.anthony.commercesimple.DTO;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO para requisição de autenticação de usuário")
public record AuthUserRequestDTO (
    @Schema(description = "Nome de usuário", example = "usuario123", required = true)
    String username, 
    
    @Schema(description = "Senha do usuário", example = "senha123", required = true)
    String password
) {
}
