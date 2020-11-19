# crud
Simple crud application with authtentication by token.
____
# Documentation

### 1. Getting started
You need to make virtuallenv:<br>
python -m venv venvname

Install the required packages:<br>
pip install -r requirement.txt

Apply migrations:<br>
manage.py migrate

### 2. Create user for autentication by token
manage.py shell<br>
from autentication.models import AuthToken<br>
user = AuthToken.objects.create_user(username="username", password="password")<br>

Now you can start local server
