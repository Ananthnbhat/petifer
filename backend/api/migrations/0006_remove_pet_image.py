# Generated by Django 3.2.14 on 2022-07-21 02:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20220721_1222'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pet',
            name='image',
        ),
    ]
