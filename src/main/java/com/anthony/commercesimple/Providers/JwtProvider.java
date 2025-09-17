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
        
        if (username != null && role != null && !role.isEmpty()) {
            var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));
            return new UsernamePasswordAuthenticationToken(username, null, authorities);
        }
        return null;
    }

}