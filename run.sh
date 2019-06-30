#!/bin/bash

docker-compose run --rm -u $UID api ipython manage.py $@
