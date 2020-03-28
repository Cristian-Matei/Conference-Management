package com.ubb.scalability.conference.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "roles", schema = "conference")
public class Role {
    private Integer id;
    private String roleName;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
        return Objects.equals(id, role.id) &&
                Objects.equals(roleName, role.roleName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, roleName);
    }

}
