DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

--table for department
--table for roles
--table for employee

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY_KEY,
    title VARCHAR(30) NOT NULL,
    salary (10, 2)DECIMAL NOT NULL,
    department_id INTEGER,
);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY_KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
);