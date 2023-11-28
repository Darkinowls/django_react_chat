# Generated by Django 4.2.7 on 2023-11-24 17:18

from django.db import migrations, models
import server.folder_handler
import server.validators.image_validators


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_remove_channel_banner_remove_channel_icon_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='server',
            name='banner',
            field=models.FileField(blank=True, null=True, upload_to=server.folder_handler.prepare_server_banner_path, validators=[server.validators.image_validators.validate_image_file_extension]),
        ),
        migrations.AlterField(
            model_name='server',
            name='icon',
            field=models.FileField(blank=True, null=True, upload_to=server.folder_handler.prepare_server_icon_path, validators=[server.validators.image_validators.validate_icon_size, server.validators.image_validators.validate_image_file_extension]),
        ),
    ]
