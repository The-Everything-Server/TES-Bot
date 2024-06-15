FROM python:3.12.4-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

ENV DISCORD_TOKEN NOPE

CMD ["python", "app.py"]