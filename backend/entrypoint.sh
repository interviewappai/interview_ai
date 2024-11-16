#!/bin/sh

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# set PYTHONUNBUFFERED=1
export PYTHONUNBUFFERED=1

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --no-input

# Start the application
echo "Starting server"
exec "$@"