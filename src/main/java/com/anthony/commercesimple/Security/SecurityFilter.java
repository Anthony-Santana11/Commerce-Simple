package com.anthony.commercesimple.Security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;


@Configuration
@EnableMethodSecurity
public class SecurityFilter {

    private static final String[] URL_WHITELIST = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/swagger-resources/**",
            "/actuator/**",
            "/api/products/**"
    };

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, JwtSecurityFilter jwtSecurityFilter, CorsConfigurationSource corsConfigurationSource) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/home/**").authenticated()
                            .requestMatchers("/api/admin/**").hasRole("ADMIN")
                            .requestMatchers("/register/user").permitAll()
                            .requestMatchers(URL_WHITELIST).permitAll();
                    auth.requestMatchers("/auth/user").permitAll();
                    auth.anyRequest().authenticated();

                })
        .addFilterBefore(jwtSecurityFilter, UsernamePasswordAuthenticationFilter.class);


        ;
        return http.build();
    }

}
