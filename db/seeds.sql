use employees;

INSERT INTO department(name)
VALUES
('Accounting'),
('Human Resources'),
('Operations'),
('Web Development');

INSERT INTO roles(title, salary, department_id)
VALUES
('Chief finance officer', 98000, 1),
('HR manager', 82000, 2),
('Office manager', 75000, 3),
('Technical support executive', 99000, 4),
('Logistics Coordinator', 40000, 3),
('Logistics Coordinator', 35000, 3),
('Junior Software Engineer', 55000, 4),
('HR representative', 68000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Melissa', 'Burger', 1, 1),
('Alma','Greer', 2, 2),
('Gabe','Miranda', 3, 3),
('Brad','Mirnov', 4, 4),
('Jeralyn','Airoso', 3, null),
('Luis','Salazar', 3, null),
('Danny','Stetsenko', 4, null),
('Jordan','Thomas', 2, null);