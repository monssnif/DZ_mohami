# Generated by Django 5.0 on 2024-01-04 16:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0008_lawyer_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lawyer',
            name='image',
        ),
    ]