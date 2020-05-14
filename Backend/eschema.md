#### User Table

```sql

CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, name VARCHAR (255) NOT NULL, username VARCHAR (255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, salt VARCHAR (255) NOT NULL, hashed_password VARCHAR (255) NOT NULL, PRIMARY KEY (id));


```


#### Projects Table

```sql

CREATE TABLE projects (id INT NOT NULL AUTO_INCREMENT, project_name VARCHAR (255) NOT NULL, PRIMARY KEY (id));
```


#### Task Table

```sql

CREATE TABLE tasks (id INT NOT NULL AUTO_INCREMENT, task_name VARCHAR (255) NOT NULL, project_id INT, user_id INT, start_time VARCHAR(255) NOT NULL, end_time VARCHAR (255) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (project_id) REFERENCES projects (id), FOREIGN KEY (user_id) REFERENCES users (id)); 
```

