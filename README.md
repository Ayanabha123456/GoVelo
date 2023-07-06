[<img src="https://img.shields.io/badge/ReactJS-Frontend-important.svg?logo=React">](<LINK>)
[<img src="https://img.shields.io/badge/Django-Backend-important.svg?logo=Django">](<LINK>)
[<img src="https://img.shields.io/badge/SQLite-Database-important.svg?logo=SQLite">](<LINK>)
[<img src="https://img.shields.io/badge/NPM-Dependencies-important.svg?logo=npm">](<LINK>)

<img src="https://i.postimg.cc/kXBWm9j9/logo.png" style="display:block;margin:auto;">
<h1 align="center" style="font-size:60px;">Go Velo</h1>

Go Velo is an e-bike renting system developed using React-JS and Django with SQLite as the database.

# Technologies
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/885px-Node.js_logo.svg.png?20170401104355" width="50">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" width="50">
<img src="https://i.postimg.cc/2SMpQnnq/django-logo.png" width="50" height="30">
<img src="https://warehouse-camo.ingress.cmh1.psfhosted.org/42ca79ff99d75bf2cb4e6097c8006b52d36484df/68747470733a2f2f6d6174706c6f746c69622e6f72672f5f7374617469632f6c6f676f322e737667" width="70">
<br>

# Prerequisutes
* Install [python](https://www.python.org/downloads/) version 3.10.4
* Install [Node.js](https://nodejs.org/en/)
* Clone/Download the repository into your local system
* Open two terminals

# How to run application?
## Backend

* Perform the upcoming operations in the 1st terminal.

* Install pipenv.
```bash
pip install pipenv
```

* Activate virtual environment.
```bash
pipenv shell
```

* Navigate to LC02-LB02-B_FINAL-PROJECT and install requirements.
```bash
cd lc02-lb02-b_final-project
pip install -r requirements.txt
```

* Navigate to BACKEND and Make your migrations.
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

* Create a new superuser.
```bash
python manage.py createsuperuser
```

* Check if it works.
```bash
python manage.py runserver
```

* Go to http://localhost:8000/admin and user your superuser credentials to access the database and do all CRUD operations in UI


## Frontend

* Perform the upcoming operations in the 2nd terminal.

* Navigate to LC02-LB02-B_FINAL-PROJECT/START_PAGES.
```bash
cd lc02-lb02-b_final-project/start_pages
```

* Download all required dependencies.
```bash
npm i
npm i --force #if npm error is thrown
```

* Start the frontend.
```bash
npm start
```

* The react app should open on http://localhost:3000/

* The frontend UI is intuitive enough for the user to interact with the application.

If you run into cors error when trying to comunicate with backend install Allow CORS: Access-Control-Allow-Origin extension on chrome

# Video Demo

[![Watch the video](https://img.youtube.com/vi/iTAUhQRudDc/maxresdefault.jpg)](https://www.youtube.com/watch?v=iTAUhQRudDc)

# Contributors
Created by :

Team members        |
:-------------------:
Dhruv Kumar Patwari :triangular_ruler:
Martin Nahalka :joy:
Ayanabha Jana :sunglasses:
Varsha Jaikrishnan :sweat_smile:
Veronica Bulani :information_desk_person:
Sanju Rana :shamrock:
Tianyi Ren :rofl:

