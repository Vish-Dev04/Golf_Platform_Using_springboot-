package com.golfplatform.controller;

import com.golfplatform.model.Subscription;
import com.golfplatform.model.User;
import com.golfplatform.repository.SubscriptionRepository;
import com.golfplatform.repository.UserRepository;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*") // Or configure in SecurityConfig
public class PaymentController {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;

    public PaymentController(UserRepository userRepository, SubscriptionRepository subscriptionRepository) {
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
    }

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, String> request) throws Exception {
        Stripe.apiKey = stripeApiKey;

        String planType = request.get("planType"); // "MONTHLY" or "YEARLY"
        String domainUrl = "http://localhost:5173";
        
        long amount = "YEARLY".equalsIgnoreCase(planType) ? 9999L : 999L; // $99.99 or $9.99

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT) 
                .setSuccessUrl(domainUrl + "/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(domainUrl + "/pricing")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount(amount)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Golf Platform " + planType + " Premium")
                                                                .build())
                                                .build())
                                .build())
                .build();

        Session session = Session.create(params);

        Map<String, String> responseData = new HashMap<>();
        responseData.put("url", session.getUrl());
        return ResponseEntity.ok(responseData);
    }

    @PostMapping("/success")
    public ResponseEntity<Map<String, String>> verifyPayment(@RequestBody Map<String, String> request) {
        try {
            Stripe.apiKey = stripeApiKey;
            String sessionId = request.get("sessionId");
            Long userId = Long.parseLong(request.get("userId"));

            Session session = Session.retrieve(sessionId);

            if ("paid".equalsIgnoreCase(session.getPaymentStatus())) {
                User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
                
                Subscription subscription = subscriptionRepository.findByUserId(userId).orElse(new Subscription());
                subscription.setUser(user);
                subscription.setStatus("ACTIVE");
                
                // We stored planType in product name earlier, let's just default to what we know or determine from amount
                long amount = session.getAmountTotal();
                if (amount >= 9999L) {
                    subscription.setPlanType("YEARLY");
                    subscription.setValidUntil(java.time.LocalDate.now().plusYears(1));
                } else {
                    subscription.setPlanType("MONTHLY");
                    subscription.setValidUntil(java.time.LocalDate.now().plusMonths(1));
                }
                
                subscriptionRepository.save(subscription);

                Map<String, String> response = new HashMap<>();
                response.put("message", "Payment successful, subscription activated.");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Payment not successful"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
