#!/bin/sh


echo "Backend environment variables:"
env | grep -E "DJANGO_|DEBUG|PYTHONPATH"

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --no-input

# Start the application
echo "Starting server"
exec "$@"