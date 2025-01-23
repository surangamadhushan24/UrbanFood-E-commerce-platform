//package com.urbanfood.payment;
//
//
//import com.urbanfood.user.JwtService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@CrossOrigin(origins = "*")
//public class PaymentController {
//
//    private final PaymentService paymentService;
//    private  final JwtService jwtService;
//
//    public PaymentController(PaymentService paymentService, JwtService jwtService) {
//        this.paymentService = paymentService;
//        this.jwtService = jwtService;
//    }
//
//    @PostMapping
//    ResponseEntity<Payment> payment(@RequestBody Payment payment) {
//
//    }
//}
