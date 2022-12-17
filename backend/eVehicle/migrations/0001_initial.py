# Generated by Django 4.1.2 on 2022-11-03 14:11

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("is_staff", models.BooleanField(default=False)),
                ("firstName", models.CharField(max_length=120)),
                ("lastName", models.CharField(max_length=120)),
                ("username", models.CharField(max_length=120)),
                ("email", models.EmailField(max_length=254, unique=True)),
                (
                    "role",
                    models.IntegerField(
                        choices=[(0, "user"), (1, "operator"), (2, "manager")],
                        default=0,
                    ),
                ),
                ("password", models.CharField(max_length=120)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Bank_Account",
            fields=[
                ("account_number", models.AutoField(primary_key=True, serialize=False)),
                ("amount", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="Hub",
            fields=[
                ("hub_id", models.AutoField(primary_key=True, serialize=False)),
                ("hub_loc", models.CharField(default="", max_length=120, unique=True)),
                (
                    "current_num",
                    models.IntegerField(
                        validators=[django.core.validators.MinValueValidator(0)]
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="VehicleType",
            fields=[
                (
                    "vehicle_type_id",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                ("name", models.CharField(default="", max_length=120, unique=True)),
                (
                    "price",
                    models.IntegerField(
                        validators=[django.core.validators.MinValueValidator(0)]
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Wallet",
            fields=[
                ("wallet_id", models.AutoField(primary_key=True, serialize=False)),
                ("amount", models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name="WalletActivity",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("time", models.DateTimeField()),
                (
                    "transaction",
                    models.IntegerField(choices=[(0, "credit"), (1, "debit")]),
                ),
                ("amount", models.FloatField()),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "wallet_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="eVehicle.wallet",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Vehicle",
            fields=[
                ("vehicle_id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "battery",
                    models.IntegerField(
                        default=100,
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(100),
                        ],
                    ),
                ),
                ("needs_repair", models.BooleanField(default=False)),
                (
                    "status",
                    models.IntegerField(
                        choices=[(0, "using"), (1, "available")], default=1
                    ),
                ),
                ("defect", models.TextField(blank=True, null=True)),
                (
                    "hub",
                    models.ForeignKey(
                        default="",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="eVehicle.hub",
                    ),
                ),
                (
                    "vehicle_type",
                    models.ForeignKey(
                        default="",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="eVehicle.vehicletype",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Trip",
            fields=[
                ("trip_id", models.AutoField(primary_key=True, serialize=False)),
                ("start_time", models.DateTimeField()),
                ("end_time", models.DateTimeField(null=True)),
                ("is_active", models.BooleanField(default=False)),
                ("fare", models.FloatField(null=True)),
                (
                    "end_loc",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        related_name="end",
                        to="eVehicle.hub",
                    ),
                ),
                (
                    "start_loc",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        related_name="start",
                        to="eVehicle.hub",
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "vehicle_id",
                    models.ForeignKey(
                        default="",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="eVehicle.vehicle",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="user",
            name="bank_account",
            field=models.OneToOneField(
                default="",
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="eVehicle.bank_account",
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="groups",
            field=models.ManyToManyField(
                blank=True,
                help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                related_name="user_set",
                related_query_name="user",
                to="auth.group",
                verbose_name="groups",
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="user_permissions",
            field=models.ManyToManyField(
                blank=True,
                help_text="Specific permissions for this user.",
                related_name="user_set",
                related_query_name="user",
                to="auth.permission",
                verbose_name="user permissions",
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="wallet_id",
            field=models.OneToOneField(
                default="",
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="eVehicle.wallet",
            ),
        ),
    ]
