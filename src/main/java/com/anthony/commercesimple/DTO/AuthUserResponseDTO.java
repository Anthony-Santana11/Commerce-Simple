package com.anthony.commercesimple.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthUserResponseDTO {
    private String acess_token;
    private String expires_in;
    private String username;
    private String role;
    private String userId;
}
