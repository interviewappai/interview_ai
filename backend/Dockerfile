FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

# Add this line to grant execute permissions
RUN chmod +x ./entrypoint.sh

# Copy the entrypoint script
COPY entrypoint.sh .


# Use the entrypoint script
ENTRYPOINT ["./entrypoint.sh"]

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "zreo_interviewai.wsgi:application"]