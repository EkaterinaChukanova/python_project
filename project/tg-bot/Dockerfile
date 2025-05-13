FROM python:3.11-slim

WORKDIR /tg-bot

COPY . /tg-bot

RUN pip install -r requirements.txt --no-cache-dir

CMD ["python", "bot.py"]
