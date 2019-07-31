# Generated by Django 2.1.2 on 2019-07-31 11:13

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('automaton', '0008_auto_20190728_1927'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fieldrating',
            name='rating',
            field=models.IntegerField(null=True, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)]),
        ),
    ]
