package com.anthony.commercesimple.Repository;

import com.anthony.commercesimple.Entity.CartItemEntity;
import com.anthony.commercesimple.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<CartItemEntity, UUID> {
    List<CartItemEntity> findByUserid(UserEntity userid);

    Optional<CartItemEntity> findByUseridAndProduct_ProductId(UserEntity userid, UUID productId);
}
