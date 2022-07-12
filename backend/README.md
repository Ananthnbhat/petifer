## Instructions on how to start django app

- install postgresql (note down the details such as password). This alos creates a default database with username - postgres, db - postgres, server - localhost and a password given by you.
- install virtualenv using pip
- activate virtualenv (below command for Windows)

```
 .\venv\Scripts\activate
```

- inside the virtualenv, install required python dependencies including psycopg2 and django.

```
pip install psycopg2 django
```

- provide the details for the database in the settings.py
- In the petiferBackend folder, run following command to start the django app:

```
python manage.py runserver
```

This should start the django server and you should be able to see it running in http://127.0.0.1:8000/
