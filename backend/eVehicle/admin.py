from django.contrib import admin

from .models import User, Wallet, Bank_Account, Trip, Vehicle, Hub, VehicleType, WalletActivity


class UserAdmin(admin.ModelAdmin):
    list_display = ('firstName', 'lastName', 'email', 'role')


class VehicleAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'vehicle_id', 'battery', 'status')

    class Meta:
        model = Vehicle

    def save_model(self, request, obj, form, change):
        obj.save()
        hub = Hub.objects.get(hub_id=obj.hub.hub_id)
        hub.current_num = hub.current_num + 1
        hub.save()


admin.site.register(User, UserAdmin)
admin.site.register(Wallet)
admin.site.register(Bank_Account)
admin.site.register(Trip)
admin.site.register(Vehicle, VehicleAdmin)
admin.site.register(VehicleType)
admin.site.register(Hub)
admin.site.register(WalletActivity)
