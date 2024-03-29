# Generated by Django 5.0 on 2024-01-06 12:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0012_lawyer_image'),
        ('search', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(blank=True, default='', max_length=1000, null=True)),
                ('respond', models.TextField(blank=True, default='', max_length=1000, null=True)),
                ('lawyerID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='register.lawyer')),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='register.user')),
            ],
        ),
    ]
