package com.anthony.commercesimple.UseCases;


import com.anthony.commercesimple.Entity.ProductEntity;
import com.anthony.commercesimple.Exceptions.ProductAlredyExistsException;
import com.anthony.commercesimple.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductsUseCase {

    @Autowired
    private ProductRepository productRepository;

    public ProductEntity creatProduct (String name, String description, BigDecimal price, String imageURL) {
        if (productRepository.existsByName(name)) {
            throw new ProductAlredyExistsException();
        }

            var newProduct = new ProductEntity();
            newProduct.setName(name);
            newProduct.setDescription(description);
            newProduct.setPrice(price);
            newProduct.setImageURL(imageURL);

            return productRepository.save(newProduct);



    }

    public List<ProductEntity>getAllProducts() {
        return productRepository.findAll();
    }

   public List<ProductEntity>findByName(String name) {
        return productRepository.findAllByName(name).stream().filter(p -> p.getName().toLowerCase().contains(name.toLowerCase())).toList();
   }

   public void RemoveProduct (ProductEntity product) {
        productRepository.findByName(product.getName()).stream().findFirst().ifPresent(p -> productRepository.delete(p));
   }

   public ProductEntity updateProduct (ProductEntity product) {
        return productRepository.save(product);
   }

   public ProductEntity getProductById(String id) {
        try {
            java.util.UUID uuid = java.util.UUID.fromString(id);
            return productRepository.findById(uuid).orElse(null);
        } catch (IllegalArgumentException e) {
            return null;
        }
   }

}
