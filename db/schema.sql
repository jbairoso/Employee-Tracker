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

CREAT TABLE ROLES (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY_KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER.
)