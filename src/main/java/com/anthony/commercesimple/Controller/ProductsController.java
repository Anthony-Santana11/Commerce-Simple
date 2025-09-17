package com.anthony.commercesimple.Controller;

import com.anthony.commercesimple.Entity.ProductEntity;
import com.anthony.commercesimple.UseCases.ProductsUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
public class ProductsController {


    @Autowired
    private ProductsUseCase productsUseCase;



    @PostMapping("/create")
    public ResponseEntity<ProductEntity>createProduct(@RequestBody ProductEntity product) {
        return ResponseEntity.ok(productsUseCase.creatProduct(product.getName(), product.getDescription(), product.getPrice(), product.getImageURL()));
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        return ResponseEntity.ok(productsUseCase.getAllProducts());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteProduct(@RequestBody ProductEntity product) {
        productsUseCase.RemoveProduct(product);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update")
    public ResponseEntity<ProductEntity> updateProduct(@RequestBody ProductEntity product) {
        return ResponseEntity.ok(productsUseCase.updateProduct(product));
    }

}
