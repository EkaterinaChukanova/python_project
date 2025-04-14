FROM python:3.13

WORKDIR /backend

COPY . .

RUN python manage.py makemigrations \
    python manage.py migrate \
    pip install -r requirements.txt

EXPOSE 8000

#CMD gunicorn 'backend.backend.wsgi' --bind=0.0.0.0:8000
CMD ["gunicorn", "backend.backend.wsgi:application", "--bind", "0.0.0.0:8000"]
