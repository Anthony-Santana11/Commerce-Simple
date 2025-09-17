package com.anthony.commercesimple.Repository;

import com.anthony.commercesimple.Entity.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;



import java.util.UUID;


public interface RegisterUserRepository extends JpaRepository<UserEntity, UUID> {
    boolean existsUserByUsernameOrEmail(String username, String email);
    boolean existsUserByUsername(String username);
}
