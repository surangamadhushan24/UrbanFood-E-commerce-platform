package com.urbanfood.product;

import com.urbanfood.user.User;
import com.urbanfood.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    public ProductController(ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @GetMapping("api/v1/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping("/api/v1/add-products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        // Get the currently authenticated user (supplier)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Get the email of the logged-in user

        // Fetch the user (supplier) details
        User supplier = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Supplier not found!"));

        // Set the supplierId in the product
        product.setSupplierId(supplier.getId());

        // Save the product to the database
        Product savedProduct = productService.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/api/v1/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Product product = productService.findProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("api/v1/products/most-popular")
    public List<Product> getMostPopularProducts() {
        // Fetch the top 5 products with the highest timesPurchased
        return productService.findTop5ByOrderByTimesPurchasedDesc();
    }
}