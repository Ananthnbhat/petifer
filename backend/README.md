Download & install python - https://www.python.org/downloads/

Download & install postgresql - https://www.postgresql.org/download/

## Instructions on how to start django app

- install postgresql (note down the details such as password). This alos creates a default database with username - postgres, db - postgres, server - localhost and a password given by you.
- install virtualenv using pip
- activate virtualenv (below command for Windows)

```
 .\venv\Scripts\activate
```

- inside the virtualenv, install required python dependencies including psycopg2 and django.

```
pip install -r requirements.txt
```

- provide the details for the database in the settings.py
- In the petiferBackend folder, run following command to start the django app:

```
python manage.py runserver
```

This should start the django server and you should be able to see it running in http://127.0.0.1:8000/

## Run and access the server from local network

1. Run the server using below command

```
python manage.py runserver 0.0.0.0:8000
```

2. This server can be acccessed in the app using IPv4 of the network.

If IP address is 192.168.1.14, then server URL will be http://192.168.1.14:8000/

3. Add the IP address to ALLOWED_HOSTS in settings.py
