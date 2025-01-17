package com.urbanfood.product;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("api/v1/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products= productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping("/api/v1/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product products = productService.save(product);
        return ResponseEntity.ok(products);

    }





}
