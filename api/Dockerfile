
FROM python:3.6

RUN apt-get update \
 && apt-get install -y postgresql \
 && apt-get clean

WORKDIR /var/api

COPY requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 8080

CMD python manage.py runserver "0.0.0.0:8080"