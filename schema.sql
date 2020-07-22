DROP DATABASE IF EXISTS employees_tracker;

CREATE DATABASE employees_tracker;

USE employees_tracker;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INT(10) NOT NULL,
    department_id INT NOT NULL REFERENCES department(id),
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL REFERENCES role(id),
    manager_id INT NULL REFERENCES employee(id),
    PRIMARY KEY(id)
);
