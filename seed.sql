INSERT INTO department
    (name)
VALUES
    ("Sales Lead"),
    ("Software Engineer"),
    ("Accountant");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Supervisor", "30000", "3"),
    ("Intern", "10000", "9"),
    ("President", "70000", "1");

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Lois", "Aleghe", "1", "6"),
    ("Joe", "Skate", "9", null),
    ("Kyle", "Bruno", "3", "5"),;
