from rest_framework import serializers
from .models import Bank_Account, Hub, Trip, User, Vehicle, VehicleType, Wallet, WalletActivity
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import datetime


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ('wallet_id', 'amount')


class WalletActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletActivity
        fields = ('id', 'user_id', 'wallet_id',
                  'time', 'transaction', 'amount')


class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank_Account
        fields = ('account_number', 'amount')


class UserSerializer(serializers.ModelSerializer):
    wallet_id = WalletSerializer()
    bank_account = BankAccountSerializer()

    class Meta:
        model = User
        fields = ('id', 'firstName', 'lastName', 'email',
                  'password', 'role', 'wallet_id', 'bank_account')


class HubSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hub
        fields = ('hub_id', 'hub_loc')


class VehicleTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = VehicleType
        fields = ('vehicle_type_id', 'name', 'price')


class VehicleSerializer(serializers.ModelSerializer):
    hub = HubSerializer()
    vehicle_type = VehicleTypeSerializer()

    class Meta:
        model = Vehicle
        fields = ('vehicle_id', 'battery', 'needs_repair',
                  'status', 'vehicle_type', 'hub', 'defect')


class VehicleSerializerPut(serializers.ModelSerializer):

    class Meta:
        model = Vehicle
        fields = ('vehicle_id', 'battery', 'needs_repair',
                  'status', 'vehicle_type', 'hub', 'defect')


class TripSerializer(serializers.ModelSerializer):
    start_loc = HubSerializer()
    end_loc = HubSerializer()
    vehicle_id = VehicleSerializer()

    class Meta:
        model = Trip
        fields = ('trip_id', 'start_loc', 'end_loc',
                  'start_time', 'end_time', 'user_id',
                  'vehicle_id', 'is_active', 'fare')


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.fields[self.username_field] = serializers.CharField()
        # print(self.fields.values)

        # del self.fields['email']

    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        print(attrs)
        print(data)
        # data.update()
        # data.update({'user': self.user.username})
        # data.update({'id': self.user.id})
        # # and everything else you want to send in the response
        return data
