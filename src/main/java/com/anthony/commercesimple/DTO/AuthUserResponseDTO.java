package com.anthony.commercesimple.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para resposta de autenticação de usuário")
public class AuthUserResponseDTO {
    @Schema(description = "Token JWT de acesso", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String acess_token;
    
    @Schema(description = "Tempo de expiração do token em milissegundos", example = "3600000")
    private String expires_in;
    
    @Schema(description = "Nome de usuário", example = "usuario123")
    private String username;
    
    @Schema(description = "Papel do usuário no sistema", example = "USER")
    private String role;
    
    @Schema(description = "ID único do usuário", example = "123e4567-e89b-12d3-a456-426614174000")
    private String userId;
}
