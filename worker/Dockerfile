
FROM python:3.6

WORKDIR /var/worker

COPY requirements.txt .
RUN pip install -r requirements.txt

CMD python3 run.py