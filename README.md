# Spring Boot Microservices Exercise

**User:** lotfi el yousfi  
**Created:** 4/4/2025  

### kanban link
### https://trello.com/b/iSLSzQT9/kanban-template

🚀 **Exercise: "Smart Orders" – Microservice E-Commerce App**
-------------------------------------------------------------

### 🧩 Overview:

Build a simplified e-commerce system with microservices for:

*   **Product Catalog**
    
*   **Order Management**
    
*   **User Service**
    
*   **API Gateway**
    
*   **Angular Frontend**
    

* * *

✅ Features You’ll Implement:
----------------------------

### 🧱 Backend (Spring Boot + Spring Cloud):

*   **Service Discovery (Eureka)**: All services register and discover via Eureka.
    
*   **API Gateway (Spring Cloud Gateway)**: Routes all frontend calls to the correct backend microservice.
    
*   **Config Server (Optional)**: Centralized external config for all services.
    
*   **Circuit Breaker**: Use Resilience4j to protect services.
    
*   **Load Balancing**: Use Spring Cloud LoadBalancer (or Ribbon if desired).
    
*   **Feign Clients**: For service-to-service communication.
*   **RABBITMQ BROKER**: For EVENT DRIVEN communication.
    

* * *

### 📦 Microservices:

#### 1\. **Product Service**

*   Add/List/Search products
    
*   `GET /products`, `POST /products`, etc.
    

#### 2\. **User Service**

*   Register/Login User
    
*   Profile info
    
*   JWT-based auth
    

#### 3\. **Order Service**

*   Place Order (calls Product + User)
    
*   Order history for a user
    

* * *

### 🌐 Frontend (Angular)

*   User Registration/Login (JWT token stored in localStorage)
    
*   Product List page
    
*   Product Details page
    
*   Place Order page
    
*   User Order History
    
*   Use Angular services to call through the API Gateway
    

* * *

🛠️ Skills Practiced:
---------------------

### Spring Boot:

*   REST Controllers
    
*   DTOs and Entities
    
*   Feign Clients
    
*   OpenAPI/Swagger
    
*   Exception Handling
    

### Spring Cloud:

*   Gateway Routing
    
*   Eureka Discovery
    
*   Central Config (optional)
    
*   Load Balancing + Circuit Breaker
    
*   Token forwarding via Gateway
    

### Angular:

*   Auth Guard
    
*   Angular Services for REST APIs
    
*   Reactive Forms
    
*   Component/Module structure
    
*   HTTP Interceptor for JWT tokens
    
*   Simple UI with Bootstrap or Angular Material
    

* * *

⚙️ Bonus Challenges (Optional but Valuable):
--------------------------------------------
 
*   Use **MongoDB** for product service and **PostgreSQL** for orders to mix databases.
    
*   Add **unit tests** and **integration tests** (Spring Boot Test + Angular's Jest).
    
*   Deploy using **Docker Compose**.
    

* * *
 
````markdown
 
---

## 🧱 Microservices Architecture
 
                            +----------------+
                            |  Config Server |
                            +----------------+
                                   |
                                   v
                           +------------------+
                           |  Eureka Server   |
                           +------------------+
                                  ^    ^    ^
                                  |    |    |
+----------------+       +----------------+       +----------------+
| Product Service | <--> | Order Service  | <-->  |  User Service  |
+----------------+       +----------------+       +----------------+
         ^                        ^                         ^
         |                        |                         |
         +------------------------+-------------------------+
                                  |
                                  v
                        +---------------------+
                        |  Spring Cloud Gateway|
                        +---------------------+
                                  |
                                  v
                          +------------------+
                          |   Angular App    |
                          +------------------+
````

* * *

📦 Microservices Breakdown
--------------------------

### ✅ Product Service

*   Endpoints:
    
    *   `GET /products`
        
    *   `GET /products/{id}`
        
    *   `POST /products`
        
*   DB: H2 or MongoDB
    

### ✅ User Service

*   Endpoints:
    
    *   `POST /register`
        
    *   `POST /login`
        
    *   `GET /me` (protected)
        
*   JWT Authentication
    
*   DB: PostgreSQL or MySQL
    

### ✅ Order Service

*   Endpoints:
    
    *   `POST /orders` (requires user + product validation)
        
    *   `GET /orders/user/{id}`
        
*   Communicates with Product and User services via Feign
    
*   DB: MySQL
    

### ✅ Gateway Service

*   Routes requests to the appropriate service
    
*   Handles JWT token forwarding
    

### ✅ Eureka Discovery Server

*   Registers and discovers services dynamically
    

### ✅ Config Server (Optional)

*   Centralized external configs for each service using Git or local repo
    

* * *

🌐 Angular Frontend
-------------------

### Features:

*   Product listing
    
*   Product details
    
*   Register/Login pages
    
*   Place order form
    
*   View order history
    

### Key Tech:

*   Angular Services (for API)
    
*   Interceptor for JWT
    
*   Routing with AuthGuard
    
*   Bootstrap or Angular Material
    

* * *

🚀 Key Technologies
-------------------

| Layer | Tech |
| --- | --- |
| Frontend | Angular 16+, TypeScript, RxJS |
| Backend | Spring Boot, Feign, JPA |
| Cloud & Infra | Spring Cloud Gateway, Eureka, Config |
| Security | Spring Security, JWT Auth |
| Databases | H2 / PostgreSQL / MongoDB |
| Build Tool | Maven or Gradle |

* * *

📚 Learning Outcomes
--------------------

*   Design modular microservices with clear boundaries
    
*   Secure services using JWT via Spring Security
    
*   Centralized configuration and dynamic service discovery
    
*   Build Angular frontend with clean API integration
    
*   Use Spring Cloud patterns: Gateway, Feign, Discovery, Config
    
*   Handle service resilience with Resilience4j (optional)
    

* * *

🧩 Bonus Challenges
-------------------

*   Add Kafka or RabbitMQ for async order processing
    
*   Use Docker Compose to orchestrate services
    
*   Add unit & integration tests (Spring + Jest)
    
*   Implement Role-based access (Admin/User)
    

* * *

✅ Suggested Workflow
--------------------

1.  Setup Eureka & Config Server
    
2.  Build and register Product, User, and Order Services
    
3.  Implement Gateway Routing and Security
    
4.  Create Angular frontend and connect through Gateway
    
5.  Test the entire flow: Register → Login → Browse → Order → View Orders
    
 

````markdown
# 🛒 Smart Orders Microservices Project (with Notifications)

## 📘 Project Overview

**Smart Orders** is a microservices-based e-commerce system designed to sharpen your skills in:
- Spring Boot & Spring Cloud
- Angular Frontend
- JWT Security
- Microservice-to-microservice communication
- Asynchronous messaging with RabbitMQ

---

## 🎯 Objective

Create a modular e-commerce system with:
- Independent services
- Dynamic discovery
- Gateway routing
- Central config
- JWT security
- **Asynchronous messaging via RabbitMQ**

---

## 🧱 Architecture (Updated)

```plaintext
                            +----------------+
                            |  Config Server |
                            +----------------+
                                   |
                                   v
                           +------------------+
                           |  Eureka Server   |
                           +------------------+
                                  ^    ^    ^   ^
                                  |    |    |   |
+----------------+       +----------------+       +----------------+
| Product Service | <--> | Order Service  | <-->  |  User Service  |
+----------------+       +----------------+       +----------------+
                                  |
                            (on order payment)
                                  |
                                  v
                      +--------------------------+
                      |   Notification Service   |
                      | (Email & App Messages)   |
                      +--------------------------+
                                  ^
                                  |
                          +-----------------+
                          |   RabbitMQ Bus  |
                          +-----------------+
                                  ^
                                  |
                        +---------------------+
                        |  Spring Cloud Gateway|
                        +---------------------+
                                  |
                                  v
                          +------------------+
                          |   Angular App    |
                          +------------------+
````

* * *

📦 New Microservice: Notification Service
-----------------------------------------

### 📨 Purpose

*   Listens to RabbitMQ for "order-paid" events
    
*   Sends:
    
    *   Email confirmations
        
    *   Internal notifications (can be saved in DB for UI)
        

### 💬 Technologies:

*   **Spring AMQP (RabbitMQ)**
    
*   **JavaMailSender (Email)**
    
*   (Optional) Thymeleaf for templating emails
    
*   Database (optional) for logging notifications
    

### 🔧 Events:

```json
{
  "orderId": "O-1001",
  "userEmail": "john@example.com",
  "total": 49.99,
  "timestamp": "2025-04-05T12:34:56Z"
}
```

* * *

🛠️ RabbitMQ Setup
------------------

### Broker Config:

*   Exchange: `order.exchange`
    
*   Routing key: `order.paid`
    
*   Queue: `order.paid.queue`
    

### Producer (in Order Service):

```java
rabbitTemplate.convertAndSend("order.exchange", "order.paid", event);
```

### Consumer (Notification Service):

```java
@RabbitListener(queues = "order.paid.queue")
public void handleOrderPaid(OrderPaidEvent event) {
    // send email, log notification, etc.
}
```

* * *

🌐 Angular Frontend Updates
---------------------------

### Features:

*   Show confirmation after order
    
*   Optional: View past notifications
    

* * *

✅ Updated Learning Outcomes
---------------------------

*   Use Spring Cloud + Angular to build distributed apps
    
*   Handle async processing with RabbitMQ
    
*   Decouple services using events (event-driven architecture)
    
*   Implement notification systems cleanly
    

* * *

🧩 Bonus Challenges
-------------------

*   Add **Dead Letter Queue** to handle failed messages
    
*   Use **Thymeleaf email templates**
    
*   Track email delivery status
    
*   Add **WebSocket** support to show real-time notification
    

* * *

🔁 Workflow Summary
-------------------

1.  User places order (Frontend → Order Service via Gateway)
    
2.  Order Service sends "order paid" event to RabbitMQ
    
3.  Notification Service listens, then:
    
    *   Sends email
        
    *   Logs notification
        
4.  Angular shows confirmation message to user
    

* * *
  
 