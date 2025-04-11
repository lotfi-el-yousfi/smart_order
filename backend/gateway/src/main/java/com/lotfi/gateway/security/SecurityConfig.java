package com.lotfi.gateway.security;


//@Configuration
//@EnableWebFluxSecurity
//public class SecurityConfig {
//
////    @Bean
////    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
////        return http
////                .authorizeExchange(exchange -> exchange
////                       // .pathMatchers("/product/api/**").authenticated() // Secure product API
////                        .anyExchange().permitAll()
////                )
////                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwkSetUri("{your-jwk-set-uri}"))) // Configure JWT resource server
////                .build();
////    }
//}