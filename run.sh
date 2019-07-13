#!/bin/bash

docker-compose run --rm -u $UID api python manage.py $@
