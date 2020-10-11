package com.group3.infsys.controller;

import com.group3.infsys.dto.LoginRequest;
import com.group3.infsys.security.CustomUserDetailsService;
import com.group3.infsys.security.JwtTokenUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class AuthenticationController {

    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(CustomUserDetailsService userDetailsService,
                                    JwtTokenUtil jwtTokenUtil,
                                    AuthenticationManager authenticationManager) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (LockedException e) {
            throw new Exception("USER_LOCKED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        String token = jwtTokenUtil.generateToken(userDetails);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Authorization", String.format("Bearer %s", token)); // Should we add Bearer?
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body("Logged in successfully");
    }
}
