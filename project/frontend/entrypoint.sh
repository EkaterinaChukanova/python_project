#!/bin/bash

python manage.py collectstatic --noinput
cp -r /frontend/static/* /static-data/ || echo "---------Static files copy skipped---------"

exec "$@"
