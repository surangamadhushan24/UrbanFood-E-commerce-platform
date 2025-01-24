package com.urbanfood.product;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    Product findProductById(String id);



    List<Product> findTop5ByOrderByTimesPurchasedDesc();
}
