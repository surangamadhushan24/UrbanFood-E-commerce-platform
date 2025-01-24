package com.urbanfood.product;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product save(Product product) {
        // Ensure the supplierId is set before saving
        if (product.getSupplierId() == null) {
            throw new RuntimeException("Supplier ID is required!");
        }
        return productRepository.save(product);
    }

    public Product findProductById(String id) {
        return productRepository.findProductById(id);
    }

    public List<Product> findTop5ByOrderByTimesPurchasedDesc() {
        return productRepository.findTop5ByOrderByTimesPurchasedDesc();
    }
}