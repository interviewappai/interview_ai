# Stage 1: Build the Vue frontend with Vite
FROM node:18 as frontend-build
WORKDIR /app/frontend
COPY ./frontend/frontend-vue .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

# Stage 2: Setup Django environment
FROM python:3.10 as backend
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django app code
COPY . .

# Copy the static files generated from the Vue build
COPY --from=frontend-build /app/frontend/frontend-vue/static/frontend /app/static/frontend

# Expose port 8000 for the Django server
EXPOSE 8000

# Run migrations and collect static files
RUN python manage.py collectstatic --noinput
RUN python manage.py migrate

# Start Django app with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "zreo_interviewai.wsgi:application"]
