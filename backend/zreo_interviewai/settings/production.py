from .base import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True

if env('ON_EXTERNAL_SERVER') == 'True':
    ALLOWED_HOSTS = ['http://localhost:8000','localhost', 'nginx','127.0.0.1', env('EXTERNAL_SERVER_HOST'),env('EXTERNAL_SERVER_CLIENT_HOST')]
    CORS_ALLOWED_ORIGINS=['http://localhost','http://nginx','https://'+env('EXTERNAL_SERVER_HOST'),'https://'+env('EXTERNAL_SERVER_CLIENT_HOST')]
    CSRF_TRUSTED_ORIGINS=['https://'+env('EXTERNAL_SERVER_HOST'),'https://'+env('EXTERNAL_SERVER_CLIENT_HOST'),'http://localhost','http://nginx']
else:
    ALLOWED_HOSTS = ['http://localhost:8000','localhost', '127.0.0.1','nginx']
    CSRF_TRUSTED_ORIGINS = ['http://localhost','http://nginx']
    CORS_ALLOWED_ORIGINS=['http://localhost','http://nginx']

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'dist/assets'),
]


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            '/app/dist',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]