package com.group3.infsys.dto;

import com.group3.infsys.model.Role;

public class RoleResponse {

    private Role role;

    public RoleResponse(Role role) {
        this.role = role;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
