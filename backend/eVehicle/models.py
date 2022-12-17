from email.policy import default
from unittest.util import _MAX_LENGTH
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class UserManager(BaseUserManager):

    def _create_user(self, firstName, lastName, username, email, role, password, wallet_id, bank_account, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(
            firstName=firstName,
            lastName=lastName,
            username=username,
            email=email,
            role=role,
            password=password,
            wallet_id=wallet_id,
            bank_account=bank_account,
            is_staff=is_staff,
            is_superuser=is_superuser,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, firstName, lastName, username, email, role, password, wallet_id, bank_account, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        wallet = Wallet(amount=12)
        wallet.save()
        account = Bank_Account(amount=100)
        account.save()
        user = self._create_user(
            "ss", "ss", "ss", email, 0, password, wallet, account, True, True, **extra_fields)
        return user

    def create_user_from_view(self, firstName, lastName, username, email, role, password):
        wallet = Wallet(amount=0)
        wallet.save()
        account = Bank_Account(amount=100)
        account.save()
        return self._create_user(firstName, lastName, username, email, role, password, wallet, account, False, False)


class User(AbstractBaseUser, PermissionsMixin):
    # different roles
    # 0:user 1:operator 2:manager
    roles_choices = (
        (0, 'user'),
        (1, 'operator'),
        (2, 'manager'),
    )
    id = models.AutoField(primary_key=True)
    is_staff = models.BooleanField(default=False)
    firstName = models.CharField(max_length=120)
    lastName = models.CharField(max_length=120)
    # Change the email_id to email, the email information of the user is stored in user table directly
    # No longer associated with email table
    username = models.CharField(max_length=120)
    email = models.EmailField(null=False, unique=True)
    role = models.IntegerField(choices=roles_choices, default=0)
    # foreign key to connect Password table
    password = models.CharField(max_length=120)
    # foreign key to connect Wallet table
    # if user is deleted, user wallet information should be deleted too, so on_delete=cascade
    wallet_id = models.OneToOneField(
        to="Wallet", to_field="wallet_id", on_delete=models.CASCADE, default="", null=True)

    bank_account = models.OneToOneField(
        to="Bank_Account", to_field="account_number", on_delete=models.CASCADE, default="", null=True)

    USERNAME_FIELD = 'email'
    objects = UserManager()

    def _str_(self):
        return self.firstName


# = Wallet table, add a foreign key bank_account to connect bank_account table, table relation is one to one
class Wallet(models.Model):
    wallet_id = models.AutoField(primary_key=True)
    amount = models.FloatField(null=False, unique=False, default=0)


# bank account table
class Bank_Account(models.Model):
    account_number = models.AutoField(primary_key=True)
    amount = models.FloatField(null=False, unique=False)


class TripManager(models.Manager):
    # def create_trip(start_loc, end_loc, start_time, end_time, user_id, vehicle_id):
    #     trip = self.model(start_loc = start_loc, end_loc = end_loc, start_time = start_time, end_time = end_time, user_id = user_id, vehicle_id = vehicle_id)
    #     trip.save(using=self._db)
    #     return trip
    def _create_trip(self, start_loc, end_loc, start_time, end_time, user_id, vehicle_id):

        trip = self.model(
            start_loc=start_loc,
            end_loc=end_loc,
            start_time=start_time,
            end_time=end_time,
            user_id=user_id,
            vehicle_id=vehicle_id,
            is_active=True
        )

        print(start_loc, end_loc, start_time, end_time, user_id, vehicle_id)

        trip.save(using=self._db)
        return trip

    def create_trip(self, start_loc, end_loc, start_time, end_time, user_id, vehicle_id):
        trip = self._create_trip(
            start_loc, end_loc, start_time, end_time, user_id, vehicle_id)
        return trip


class Trip(models.Model):
    trip_id = models.AutoField(primary_key=True)
    start_loc = models.ForeignKey("Hub", to_field='hub_id',
                                  on_delete=models.DO_NOTHING, null=True, related_name='start', unique=False)
    end_loc = models.ForeignKey("Hub", to_field='hub_id',
                                on_delete=models.DO_NOTHING, null=True, related_name='end', unique=False)
    start_time = models.DateTimeField(unique=False)
    end_time = models.DateTimeField(unique=False, null=True)
    user_id = models.ForeignKey(
        User, to_field='id', on_delete=models.DO_NOTHING)
    vehicle_id = models.ForeignKey(
        "Vehicle", to_field='vehicle_id', on_delete=models.DO_NOTHING, default='')
    is_active = models.BooleanField(default=False)
    fare = models.FloatField(null=True)

    objects = TripManager()

# class VehicleManager(models.Manager):
#     def _create_vehicle(self, veh_loc, battery, needs_repair, status, vehicleType, hub):
#         vehicle = self.model(
#             veh_loc = veh_loc,
#             baterry = baterry,
#             needs_repair = needs_repair,
#             status = status,
#             vehicle_type = vehicleType,
#             hub = hub
#         )
#         vehicle.save(using=self._db)
#         return vehicle


class Vehicle(models.Model):
    status_choices = (
        (0, 'using'),
        (1, 'available'),
    )
    vehicle_id = models.AutoField(primary_key=True)
    battery = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=100)
    needs_repair = models.BooleanField(default=False)
    status = models.IntegerField(choices=status_choices, default=1)
    vehicle_type = models.ForeignKey("VehicleType", to_field='vehicle_type_id',
                                     on_delete=models.DO_NOTHING, default='')
    hub = models.ForeignKey("Hub", to_field='hub_id',
                            on_delete=models.DO_NOTHING, default='')
    defect = models.TextField(null=True, blank=True)

    def _str_(self):
        return [self.vehicle_id, self.battery, self.needs_repair, self.status, self.vehicle_type, self.hub, self.defect]


class VehicleType(models.Model):
    vehicle_type_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=120, unique=True, default='')
    price = models.FloatField(validators=[MinValueValidator(0)])


class Hub(models.Model):
    hub_id = models.AutoField(primary_key=True)
    hub_loc = models.CharField(max_length=120, unique=True, default='')
    current_num = models.IntegerField(validators=[MinValueValidator(0)])


class WalletActivity(models.Model):
    transaction_choices = (
        (0, 'credit'),
        (1, 'debit'),
    )
    id = models.AutoField(primary_key=True)
    time = models.DateTimeField(unique=False)
    user_id = models.ForeignKey(
        User, to_field='id', on_delete=models.DO_NOTHING)
    wallet_id = models.ForeignKey(
        Wallet, to_field='wallet_id', on_delete=models.DO_NOTHING)
    transaction = models.IntegerField(choices=transaction_choices)
    amount = models.FloatField(null=False, unique=False)
