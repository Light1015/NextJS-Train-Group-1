"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

try:
    from django.core.management import call_command
    call_command('migrate')
    print("Migrations applied successfully.")
except Exception as e:
    print(f"Migration failed: {e}")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
