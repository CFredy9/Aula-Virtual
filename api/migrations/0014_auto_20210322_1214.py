# Generated by Django 2.2.13 on 2021-03-22 18:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_estudiante_inicio_sesion'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='catedratico',
            name='inicio_sesion',
        ),
        migrations.RemoveField(
            model_name='estudiante',
            name='inicio_sesion',
        ),
    ]