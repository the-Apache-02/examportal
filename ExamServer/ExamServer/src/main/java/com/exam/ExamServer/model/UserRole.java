package com.exam.ExamServer.model;

import jakarta.persistence.*;

@Entity
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userRole;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @ManyToOne
    private Role role;

    public Long getUserRole() {
        return userRole;
    }

    public void setUserRole(Long userRole) {
        this.userRole = userRole;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
