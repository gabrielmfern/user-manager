# User Manager - Back End

This is the code that is responsible for dealing with the users data (fetching, creating, deleting, updating)

## What is included in this project?

- Unit testing using the `unittest` python package
- REST API using Flask with error treatment
- Data management using dictionaries, dataclasses and somewhat isolated functions/methods
- A request collection for testing the API using Insomnia (`insomnia-requests-collection.json`)

## How to run?

First you will need to install the dependencies of the project running the command:

```sh
pip install -r requirements.txt
```

This will install all the necessary dependencies/requirements that will be necessary to run
the API. Then you can run the command:

```
cd src && flask --app user_manager run
```

This will run the API in the localhost port 5000. To then test this API you can import the 
Insomnia collection of requests I made to showcase the functionalities of the API in action.

## How to run unit tests?

To run them is very simple, all you need to do is run the follwing command in your terminal:

```sh
python3 -m unittest tests/user.py
```

