package com.group3.infsys.controller;

import com.group3.infsys.dto.LoginRequest;
import com.group3.infsys.dto.RoleResponse;
import com.group3.infsys.model.Role;
import com.group3.infsys.model.User;
import com.group3.infsys.security.CustomUserDetailsService;
import com.group3.infsys.security.JwtTokenUtil;
import com.group3.infsys.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Iterator;

@CrossOrigin
@RestController
public class AuthenticationController {

    private final UserDetailsService userDetailsService;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(CustomUserDetailsService userDetailsService,
                                    UserService userService,
                                    JwtTokenUtil jwtTokenUtil,
                                    AuthenticationManager authenticationManager) {
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequest request) throws Exception {
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

        User user = userService.getUserByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String token = jwtTokenUtil.generateToken(userDetails, user);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Authorization", String.format("Bearer %s", token));
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .build();
    }

    /**
     * Returns the associated role for the user.
     */
    @GetMapping("/role")
    public ResponseEntity<RoleResponse> role() {
        Iterator<? extends GrantedAuthority> authorities = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getAuthorities().iterator();
        if (!authorities.hasNext()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No role found for the provided user");
        }
        String roleName = authorities.next().getAuthority().split("_")[1];
        try {
            Role role = Role.valueOf(roleName);
            return ResponseEntity.ok().body(new RoleResponse(role));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Invalid role name");
        }
    }
}
