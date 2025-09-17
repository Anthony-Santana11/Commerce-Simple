package com.anthony.commercesimple.UseCases;

import com.anthony.commercesimple.DTO.AuthUserRequestDTO;
import com.anthony.commercesimple.DTO.AuthUserResponseDTO;
import com.anthony.commercesimple.Repository.AuthUserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.sasl.AuthenticationException;
import java.time.Duration;
import java.time.Instant;

@Service
public class AuthUserUseCase {

    @Value("${security.token.secret}")
    private String secretKey;

    @Autowired
    private AuthUserRepository authUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthUserResponseDTO execute(AuthUserRequestDTO authUserRequestDTO) throws AuthenticationException {
        // Busca usuário por username
        var candidate = authUserRepository.findByUsername(authUserRequestDTO.username())
                .orElseThrow(() -> new UsernameNotFoundException("Username / Password incorrect"));

        // Verifica senha
        var passwordMatches = this.passwordEncoder
                .matches(authUserRequestDTO.password(), candidate.getPassword());

        if (!passwordMatches) {
            throw new AuthenticationException("Username / Password incorrect");
        }

        // Cria token JWT
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        var expiresIn = Instant.now().plus(Duration.ofMinutes(10));
        var token = JWT.create()
                .withIssuer("commercesimple")
                .withSubject(candidate.getUsername())
                .withClaim("role", candidate.getRole().toString())
                .withExpiresAt(expiresIn)
                .sign(algorithm);

        // Retorna DTO de resposta
        return AuthUserResponseDTO.builder()
                .acess_token(token)
                .expires_in(String.valueOf(expiresIn.toEpochMilli()))
                .username(candidate.getUsername())
                .role(candidate.getRole().toString())
                .userId(candidate.getUserId().toString())
                .build();
    }






}
