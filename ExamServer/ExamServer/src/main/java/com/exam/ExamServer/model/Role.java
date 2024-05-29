package com.exam.ExamServer.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="role")
public class Role {

    @Id
    private Long roleId;
    private String roleName;

    @OneToMany(cascade = CascadeType.ALL,fetch=FetchType.LAZY,mappedBy = "role")
    private Set<UserRole> userRoleSet=new HashSet<>();

    public Set<UserRole> getUserRoleSet() {
        return userRoleSet;
    }

    public void setUserRoleSet(Set<UserRole> userRoleSet) {
        this.userRoleSet = userRoleSet;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
