FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    portaudio19-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django app code
COPY backend/ .

# Copy frontend build
COPY --from=frontend-build /app/dist /app/static/frontend

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "zreo_interviewai.wsgi:application"]