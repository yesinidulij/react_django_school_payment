# Generated by Django 5.1.3 on 2024-12-06 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_systemuser_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='systemuser',
            name='role',
            field=models.CharField(default='user', max_length=50),
        ),
    ]
