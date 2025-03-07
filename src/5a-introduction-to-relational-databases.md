## Introduction to Relational Databases

In the last section, we installed, configured, and setup a Linux, Apache, MySQL, and PHP (LAMP) stack.
While setting up MySQL, we created a basic `opacdb` database containing a `books` table.
We learned a few queries to get a feel for how querying a relational database, like MySQL, works.

In this section, we are going to spend a bit more time with MySQL simply to acquire a greater understanding of relational databases.
The real power of relational databases lies in their ability to manage and retrieve data efficiently.
This is accomplished by spreading data across multiple tables thus limiting data duplication.

We'll create a new database for our `opacuser`.
Unlike the `opacdb` database, our new database, which we'll call `DinnerDB`, will contain two tables.
This will reduce the amount of data we need to add to our database.

## Create Database

First, we will create a new database.
Our `opacuser` does not have the privileges to create a new database, so we must login as the root MySQL user:

```
sudo mysql -u root
```

Once logged in, we create a database called `DinnerDB`.
We could create another user, but for our purposes, we can simply grant `opacuser` privileges on the new database.

```
mysql> create database DinnerDB;
mysql> grant all privileges on DinnerDB.* to 'opacuser'@'localhost';
```

Now that we have given `opacuser` new privileges for a new database, we may want to track `opacuser`'s privileges:

```
mysql> show grants for 'opacuser'@'localhost';
```

We are done and can exit as the root MySQL user:

```
mysql> \q
```

## Create Tables

Next we login as `opacuser`:

```
mysql -u opacuser -p
```

First, let's check if we can see if the new `DinnerDB` database is visible to `opacuser`.
If so, we begin using it:

```
[(none)]> show databases;
[(none)]> use DinnerDB;
```

### Create `Meals` Table

We are going to create two tables in `DinnerDB`.
We will call the first table `Meals` and the second table `Ingredients`.
The second table will list the ingredients and quantities needed to make the meals named in the `Meals` table.

The following command creates a table called `Meals`.
The table has five values:

- `meal_id` in an integer that serves as the primary key.
- `meal_name` contains a variable-length string up to 100 characters.
- `cuisine` contains a variable-length string up to 50 characters.
- `cooking_time` is an integer that uses a CHECK constraint so that if a user enters a zero or a negative value, MySQL will reject it, or if a user enters no value, it will default to one.
- `vegetarian` contains a BOOLEAN value, which means it must be TRUE or FALSE:
    - technically, BOOLEAN is synonymous with a data type called `TINYINT(1)`, but BOOLEAN better conveys what we mean.

```
create table Meals (
    meal_id int auto_increment primary key,
    meal_name varchar(100) not null,
    cuisine varchar(50),
    cooking_time int not null default 1 check (cooking_time > 0),
    vegetarian boolean
);
```

### Create ingredients table

The following command creates the `Ingredients` table.
The table has four values:

- `ingredient_id` is the primary key.
- `meal_id` is an integer:
    - the last line in the command declares the `meal_id` value to be a foreign key that references the `meal_id` in the `Meals` table
    - foreign keys allow for cross-referencing.
    - since we cross-reference `meal_id` here to `meal_id` to the `Meals` table, we make the `Ingredients` table a child of the `Meals` table, which functions as the parent table to the `Ingredients` table.
    - the `on delete cascade` clause instructs MySQL to delete associated ingredients when deleting a meal in the `Meals` table.
- `ingredient_name` contains a variable-length string up to 100 characters.
- `quantity` contains a variable-length string up to 50 characters.

```
CREATE TABLE Ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    meal_id INT,
    ingredient_name VARCHAR(100) NOT NULL,
    quantity VARCHAR(50),
    FOREIGN KEY (meal_id) REFERENCES Meals(meal_id) ON DELETE CASCADE
);
```

## Insert data

Now that we have created the structure of our two tables, we can begin adding data to them.
The first command adds four records to the `Meals` table:

```
INSERT INTO Meals (meal_name, cuisine, cooking_time, vegetarian) VALUES
('Spaghetti Bolognese', 'Italian', 45, FALSE),
('Vegetable Stir Fry', 'Chinese', 20, TRUE),
('Chicken Curry', 'Indian', 50, FALSE),
('Mushroom Risotto', 'Italian', 35, TRUE);
```

And the second command adds the list of ingredients for the meals we added to the `Meals` table.
The integers we use for `meal_id` match the values produced in the `Meals` table, which we can see with the `select * from Meals;` command.
Therefore, `1` refers to **Spaghetti Bolognese**, `2` refers to **Vegetable Stir Fry**, and so on.

```
INSERT INTO Ingredients (meal_id, ingredient_name, quantity) VALUES
(1, 'Spaghetti', '200g'),
(1, 'Ground Beef', '250g'),
(1, 'Tomato Sauce', '1 cup'),
(2, 'Broccoli', '100g'),
(2, 'Carrots', '50g'),
(2, 'Soy Sauce', '2T'),
(3, 'Chicken Breast', '300g'),
(3, 'Curry Powder', '2T'),
(3, 'Coconut Milk', '1 cup'),
(4, 'Arborio Rice', '1 cup'),
(4, 'Mushrooms', '1 cup'),
(4, 'Parmesan Cheese', '1/2 cup');
```

In practice, we might want to create an additional column that would contain units for the quantities (e.g., cups, grams, etc).
This would result in better [database normalization][db_normalization_wiki].

## Querying Data

Now that we have created our tables and added records to them, we can begin to query them.
The next command is a simple `SELECT` statement:

```
select * from Meals;
```

By adding the `WHERE` clause, we can filter results.
In this example, we filter results by whether a meal is vegetarian:

```
select * from Meals where vegetarian = TRUE;
```

We can sort the results by descending or ascending order.
This works for both alphabetic and numeric characters.
The following commands sort the Meals by length of cooking time:

```
select * from Meals order by cooking_time desc; 
select * from Meals order by cooking_time asc; 
```

In the following command, we select three values:

- `meal_name` from the `Meals` table and rename the resulting column `Meals`.
- `ingredient_name` from the `Ingredients` table and rename the resulting column `Ingredients`.
- `quantity` from the `Ingredients` table and rename the resulting column `Quantity`.

We also use the `join` action to cross-reference the tables based on the shared `meal_id` value:

```
select Meals.meal_name as Meals, Ingredients.ingredient_name as Ingredients, Ingredients.quantity as Quantity
from Meals
join Ingredients on Meals.meal_id = Ingredients.meal_id;
```

In the following example, we list the ingredients and their quantities based on the name of a meal.
In this case, we are looking to list the ingredients for the Chicken Curry dish:

```
SELECT ingredient_name as Ingredients, quantity as Quantity
FROM Ingredients 
WHERE meal_id = (SELECT meal_id FROM Meals WHERE meal_name = 'Chicken Curry');
```

In the following example, we instruct MySQL to provide a count of the Meals by cuisine:

```
select cuisine, count(*) as meal_count 
FROM Meals
group by cuisine;
```

And finally, it's been a tough day, and we want to identify Meals that don't take long to cook.
The following command returns all Meals where the cooking time is less than or equal to 45 minutes:

```
select meal_name, cooking_time 
from Meals 
where cooking_time <= 45
order by cooking_time asc;
```

Once done querying our database, we can logout:

```
\q
```

## Database Management

When we started, we logged into MySQL and created a database called `DinnerDB`.
Then we granted all privileges to this database to `opacuser`.
There might be times when we want to revoke those privileges.
To do so, we first log back in as the root MySQL user:

```
sudo mysql -u root
```

Now we can re-review the privileges for `opacuser`:

```
mysql> show grants for 'opacuser'@'localhost';
```

We can take away those privileges with the `REVOKE` command:

```
mysql> revoke all privileges on DinnerDB.* from 'opacuser'@'localhost';
```

To confirm, we can re-run the `show grants` command.

We can also delete the database using the `DROP` command:

```
mysql> DROP database DinnerDB;
```

## Conclusion

In this introduction, we explored the basics of relational databases using MySQL.
We created a structured database (`DinnerDB`), defined two tables (`Meals` and `Ingredients`),
inserted data, and performed various queries to retrieve information efficiently.

The key takeaways from this exercise include:

- **Normalization**: Breaking data into multiple tables reduces redundancy and improves consistency.
- **Relationships**: Using foreign keys, we linked meals with their ingredients. This allows for more meaningful data retrieval.
- **Querying**: We practiced `SELECT`, `JOIN`, `WHERE`, `ORDER_BY`, and `GROUP_BY` to manipulate and filter data results.
- **Management**: We reviewed how to create a database, grant privileges to the database to a specific user, remove those privileges, and delete the database.

This tutorial is only a start.
Experiment with modifying the data, adding constraints, separating quantities from units, or
creating additional tables to further your understanding.
Databases are powerful tools for organizing and retrieving structured information.
Understanding SQL and its logic will help you in other domains, too!
Go play!

[db_normalization_wiki]:https://en.wikipedia.org/wiki/Database_normalization
