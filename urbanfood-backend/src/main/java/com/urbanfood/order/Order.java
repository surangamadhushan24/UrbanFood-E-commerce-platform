package com.urbanfood.order;

import com.urbanfood.payment.Payment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "order")
public class Order {

    @Id
    private String id;
    private String customerId;
    private List<String> productIds;
    private String orderDate;
    private Double totalAmount;
    private Payment payment;
    private String status;

}
