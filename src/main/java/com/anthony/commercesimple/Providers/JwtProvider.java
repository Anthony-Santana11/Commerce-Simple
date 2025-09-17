package com.anthony.commercesimple.Providers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JwtProvider {

    @Value("${security.token.secret}")
    private String secretKey;

    public DecodedJWT validateToken(String token) {
        token = token.replace("Bearer ", "");

        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        try {
            var tokenDecoded = JWT.require(algorithm)
                    .build()
                    .verify(token);
            return tokenDecoded;
        } catch (JWTVerificationException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public UsernamePasswordAuthenticationToken getAuthentication(DecodedJWT decodedJWT) {
        String username = decodedJWT.getSubject();
        String role = decodedJWT.getClaim("role").asString();
        
        System.out.println("=== JWT AUTHENTICATION DEBUG ===");
        System.out.println("Username: " + username);
        System.out.println("Role from JWT: " + role);
        
        if (username != null && role != null && !role.isEmpty()) {
            // Garantir que o role tenha o prefixo ROLE_ para o Spring Security
            String roleWithPrefix = role.startsWith("ROLE_") ? role : "ROLE_" + role;
            System.out.println("Role with prefix: " + roleWithPrefix);
            
            var authorities = List.of(new SimpleGrantedAuthority(roleWithPrefix));
            System.out.println("Authorities: " + authorities);
            
            return new UsernamePasswordAuthenticationToken(username, null, authorities);
        }
        System.out.println("Authentication failed - missing username or role");
        return null;
    }

}