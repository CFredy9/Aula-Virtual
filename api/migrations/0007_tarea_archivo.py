# Generated by Django 2.2.13 on 2021-03-05 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20210305_0038'),
    ]

    operations = [
        migrations.AddField(
            model_name='tarea',
            name='archivo',
            field=models.FileField(blank=True, null=True, upload_to='archivos_tarea'),
        ),
    ]