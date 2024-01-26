# Generated by Django 5.0.1 on 2024-01-26 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=31, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('hash_time', models.IntegerField(default=100)),
            ],
        ),
    ]