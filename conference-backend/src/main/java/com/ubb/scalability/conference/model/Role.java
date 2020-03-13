package com.ubb.scalability.conference.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "roles", schema = "conference")
public class Role {
    private int id;
    private String roleName;
    private Collection<UserRole> usersRolesById;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "role_name", nullable = false, length = 20)
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return id == role.id &&
                Objects.equals(roleName, role.roleName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, roleName);
    }

    @OneToMany(mappedBy = "rolesByRoleId")
    public Collection<UserRole> getUsersRolesById() {
        return usersRolesById;
    }

    public void setUsersRolesById(Collection<UserRole> usersRolesById) {
        this.usersRolesById = usersRolesById;
    }
}
