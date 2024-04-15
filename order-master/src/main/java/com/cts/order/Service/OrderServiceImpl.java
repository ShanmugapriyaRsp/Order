package com.cts.order.Service;

import com.cts.order.model.Order;
import com.cts.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;
    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public String addOrder(Order order) {
        orderRepository.save(order);
        return "Order placed and will be delivered at "+ order.getDeliveryDate();
    }
}
