package com.anthony.commercesimple.Security;

import com.anthony.commercesimple.Providers.JwtProvider;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtSecurityFilter extends OncePerRequestFilter {

    @Autowired
    private JwtProvider jwtProvider;


        @Override
        protected void doFilterInternal(HttpServletRequest request,
                                        HttpServletResponse response,
                                        FilterChain filterChain) throws ServletException, IOException {

            String authorizationHeader = request.getHeader("Authorization");

            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String token = authorizationHeader.substring(7);

                // Verifica se o token é válido
                DecodedJWT decodedJWT = jwtProvider.validateToken(token);
                if (decodedJWT != null) {
                    // Recupera a autenticação a partir do token
                    var auth = jwtProvider.getAuthentication(decodedJWT);
                    if (auth != null) {
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            }

            // Segue o filtro mesmo que não tenha autorização, Spring Security vai bloquear endpoints protegidos
            filterChain.doFilter(request, response);
        }

        @Override
        protected boolean shouldNotFilter(HttpServletRequest request) {
            // Aqui você pode liberar algumas rotas sem token, ex: login ou register
            String path = request.getServletPath();
            return path.equals("/login") || path.equals("/register");
        }
    }


