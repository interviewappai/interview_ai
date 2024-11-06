from django import template
import json
import os

register = template.Library()

@register.simple_tag
def vite_asset(filename):
    try:
        # Read the manifest.json file created by Vite build
        with open('dist/manifest.json', 'r') as manifest_file:
            manifest = json.load(manifest_file)
        # Return the hashed filename from manifest
        return f"/assets/{manifest.get(filename, '')}"
    except:
        return ''