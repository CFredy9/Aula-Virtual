# Generated by Django 2.2.13 on 2021-03-25 22:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20210325_1543'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ciclo_escolar',
            name='titular',
            field=models.BooleanField(default=True),
        ),
    ]
