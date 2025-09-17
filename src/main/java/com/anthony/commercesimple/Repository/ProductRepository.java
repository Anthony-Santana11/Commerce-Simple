package com.anthony.commercesimple.Repository;

import com.anthony.commercesimple.Entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductEntity, UUID> {
    Optional<ProductEntity>findAllByName(String name);
    boolean existsByName(String name);
    List<ProductEntity> findByName(String name);
}
