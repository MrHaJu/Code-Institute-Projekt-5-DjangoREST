# Generated by Django 3.2.23 on 2024-01-08 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='/images/default_profile_mc0hy3', upload_to='images/'),
        ),
    ]