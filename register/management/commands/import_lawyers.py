import json
import os
from django.core.management.base import BaseCommand
from register.models import Lawyer   # Adjust the import path based on your actual app structure

class Command(BaseCommand):
    help = 'Import lawyers data into the database'

    def handle(self, *args, **options):
        # Specify the full path to the JSON file within the same directory as the script
        json_file_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lawyers_data.json')

        with open(json_file_path, 'r') as file:
            lawyers_data = json.load(file)

            for lawyer_data in lawyers_data:
                Lawyer.objects.create(**lawyer_data)

        self.stdout.write(self.style.SUCCESS('Lawyers data imported successfully'))