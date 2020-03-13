package com.ubb.scalability.conference.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "users_roles", schema = "conference")
public class UserRole {
    private int id;
    private Integer roleId;
    private Integer userId;
    private Role rolesByRoleId;
    private User usersByUserId;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "role_id", nullable = true)
    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "user_id", nullable = true)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRole userRole = (UserRole) o;
        return id == userRole.id &&
                Objects.equals(roleId, userRole.roleId) &&
                Objects.equals(userId, userRole.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, roleId, userId);
    }

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    public Role getRolesByRoleId() {
        return rolesByRoleId;
    }

    public void setRolesByRoleId(Role rolesByRoleId) {
        this.rolesByRoleId = rolesByRoleId;
    }

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    public User getUsersByUserId() {
        return usersByUserId;
    }

    public void setUsersByUserId(User usersByUserId) {
        this.usersByUserId = usersByUserId;
    }
}
