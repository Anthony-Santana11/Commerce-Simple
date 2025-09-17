package com.anthony.commercesimple.Repository;

import com.anthony.commercesimple.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthUserRepository extends JpaRepository<UserEntity, UUID> {
   Optional<UserEntity> findByUsernameOrEmail(String username, String email);
   Optional<UserEntity> findByUsername(String username);
}