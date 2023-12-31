# Generated by Django 4.2.7 on 2023-11-21 10:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import server.folder_handler
import server.validators.image_validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('icon', models.FileField(blank=True, null=True, upload_to=server.folder_handler.prepare_category_icon_path)),
            ],
        ),
        migrations.CreateModel(
            name='Server',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.category')),
                ('member', models.ManyToManyField(related_name='server_member', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='server_owner', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('topic', models.CharField(max_length=100)),
                ('banner', models.ImageField(blank=True, null=True, upload_to=server.folder_handler.prepare_server_banner_path, validators=[server.validators.image_validators.validate_image_file_extension])),
                ('icon', models.ImageField(blank=True, null=True, upload_to=server.folder_handler.prepare_server_icon_path, validators=[server.validators.image_validators.validate_icon_size, server.validators.image_validators.validate_image_file_extension])),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('server', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='channel_server', to='server.server')),
            ],
        ),
    ]
