todoDataModel = {
    todo_id,
    todo,
    due_date,
    acc_email
}

accountDataModel = {
    acc_id,
    acc_username,
    acc_email,
    acc_password
}

CREATE TABLE todos (
	todo_id INT PRIMARY KEY AUTO_INCREMENT,
    todo VARCHAR(50),
    due_date DATE,
    acc_email VARCHAR(50)
);

CREATE TABLE userAccounts (
	acc_id INT PRIMARY KEY AUTO_INCREMENT,
    acc_username VARCHAR(50),
    acc_email VARCHAR(50),
    acc_password VARCHAR(255)
);