# Generated by Django 3.2.14 on 2022-08-29 03:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20220829_1223'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='latitude',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='pet',
            name='longitude',
            field=models.CharField(default='', max_length=10),
        ),
    ]
