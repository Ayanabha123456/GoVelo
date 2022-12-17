from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BankAccountSerializer, HubSerializer, TripSerializer, UserSerializer, VehicleSerializerPut, WalletActivitySerializer, WalletSerializer
from .models import User, Hub, Vehicle, Trip, WalletActivity, VehicleType
from .serializers import CustomTokenObtainPairSerializer, VehicleSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from .models import UserManager, Wallet, Bank_Account
from .utils import calculateCost, checkBalance, barGraph, pieGraph, lineGraph
import json
from datetime import datetime, timezone
from rest_framework import status
# Create your views here.


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer


class GraphViewSet(APIView):
    def get(self, request):

        hubs = Hub.objects.all()
        labels, x, y = [], [], []
        x3, y3 = [], []
        x4, y4 = [], [0, 0, 0, 0, 0]
        for hub in hubs:
            _trips = Trip.objects.filter(start_loc=hub.hub_id)
            _trips_endLoc = Trip.objects.filter(end_loc=hub.hub_id)
            if len(_trips):
                x.append(hub.hub_loc)
                temp = 0
                for i in range(len(_trips)):
                    if _trips[i].fare:
                        temp += _trips[i].fare
                y.append(temp)
                _vehicle_types = VehicleType.objects.all()
                x1, y1 = [], [0, 0, 0, 0, 0]
                for j in range(len(_vehicle_types)):
                    for i in range(len(_trips)):
                        if _vehicle_types[j] == _trips[i].vehicle_id.vehicle_type:
                            if _trips[i].fare:
                                if _vehicle_types[j].name not in x1:
                                    x1.append(_vehicle_types[j].name)
                                y1[j] += _trips[i].fare
                y1 = [i for i in y1 if i != 0]
                barGraph(x1, y1, hub.hub_loc)
                x2, y2 = [], []
                _trips_by_time = Trip.objects.filter(
                    start_loc=hub.hub_id).order_by('start_time')
                for _trip in _trips_by_time:
                    x2.append(_trip.start_time)
                    y2.append(_trip.fare)
                lineGraph(x2, y2, hub.hub_loc)
                x3.append(hub.hub_loc)
                y3.append(len(_trips)+len(_trips_endLoc))
        # hub bar All
        x6, y6 = [], [0, 0, 0, 0, 0]
        _vehicle_types = VehicleType.objects.all()
        _trips = Trip.objects.all()
        for j in range(len(_vehicle_types)):
            for i in range(len(_trips)):
                if _vehicle_types[j] == _trips[i].vehicle_id.vehicle_type:
                    if _trips[i].fare:
                        if _vehicle_types[j].name not in x6:
                            x6.append(_vehicle_types[j].name)
                        y6[j] += _trips[i].fare
        newx6 = []
        # for i in range(len(x6)):
        #     if y6[i] != 0:
        #         newx6.append(x6[i])
        y6 = [i for i in y6 if i != 0]
        barGraph(x6, y6, "All")

        barGraph(x3, y3, "total_counts_All_types")
        # Overall count for vehicle types, to see which is most popular
        types = VehicleType.objects.all()
        _trips = Trip.objects.all()
        for i in range(len(types)):
            x4.append(types[i].name)
            for _trip in _trips:
                if _trip.vehicle_id.vehicle_type == types[i]:
                    y4[i] += 1
        newx4 = []
        for i in range(len(x4)):
            if y4[i] != 0:
                newx4.append(x4[i])
        y4 = [i for i in y4 if i != 0]
        pieGraph(y4, "most_pop_types", newx4)
        barGraph(x, y, "All_hubs")
        x5, y5 = [], []
        _trips1 = Trip.objects.order_by('start_time')
        for _trip in _trips1:
            x5.append(_trip.start_time)
            y5.append(_trip.fare)
        lineGraph(x5, y5, "All")
        pie_data_all = [len(Vehicle.objects.filter(status=1, needs_repair=0, battery__gte=50)), len(Vehicle.objects.filter(
            status=0)), len(Vehicle.objects.filter(needs_repair=1)), len(Vehicle.objects.filter(battery__lte=50))]
        pie_data_all_labels = ['available',
                               'in use', 'needs repair', 'needs charge']
        queryset = Hub.objects.all()
        for _hub in queryset:
            if len(Vehicle.objects.filter(hub=_hub)) != 0:
                pie_data_hub = [len(Vehicle.objects.filter(hub=_hub, status=1, needs_repair=0, battery__gte=50)), len(Vehicle.objects.filter(
                    hub=_hub, status=0)), len(Vehicle.objects.filter(hub=_hub, needs_repair=1)), len(Vehicle.objects.filter(hub=_hub, battery__lte=49))]
                pieGraph(pie_data_hub, _hub.hub_loc, pie_data_all_labels)
        pieGraph(pie_data_all, "All", pie_data_all_labels)
        return Response("done")


class BookViewSet(APIView):
    # permission_classes = [IsAuthenticated]
    queryset = Hub.objects.all()

    def post(self, request):
        current_user = request.user
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        if body['requestType'] == 'book':
            vehicle_id = body['vehicleID'][:-2]
            queryset = User.objects.all()
            _user = queryset[0]
            for i in queryset:
                if i.id == current_user.id:
                    _user = i
            try:

                _vehicle = Vehicle.objects.get(pk=vehicle_id)
                _vehicle.status = 0
                _vehicle.save(update_fields=['status'])

                Trip.objects.create_trip(
                    _vehicle.hub, None, body['timestamp'], None, _user, _vehicle)
                return Response("done")
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            user = User.objects.get(pk=current_user.id)
            new_balance = checkBalance(user.wallet_id.amount, body['bill'])
            if new_balance > 0:
                _trip = Trip.objects.get(pk=body['trip_id'])
                _hub = Hub.objects.get(hub_loc=body['return_location'])
                _trip.end_loc = _hub
                _trip.is_active = False
                _trip.save(update_fields=['end_loc', 'is_active'])
                _trip.vehicle_id.status = 1
                _vehicle = Vehicle.objects.get(pk=_trip.vehicle_id.vehicle_id)
                _vehicle.hub = _hub
                _vehicle.save(update_fields=['hub'])
                _trip.vehicle_id.save(update_fields=['status'])
                return Response("Success")
            else:
                return Response("Not enough funds in wallet")

    def get(self, request):
        current_user = request.user
        id = request.user.id
        body_unicode = request.body.decode('utf-8')
        body = body_unicode.split("&")

        if request.GET.get("1") == 'get_hub':
            # if body[0] == "asdasd":
            queryset = Hub.objects.all()
            return_list = []
            for query in queryset:
                return_list.append(query.hub_loc)
            return Response(return_list)
        elif request.GET.get("1") == 'get_vehicles_types':

            return_list = []
            types = []
            queryset = Vehicle.objects.all()
            queryhubs = Hub.objects.filter(hub_loc=request.GET.get("2"))
            hub_id = queryhubs[0].hub_id
            queryset = Vehicle.objects.filter(
                hub=hub_id, needs_repair=False, status=1, battery__gte=50)

            for query in queryset:
                if query.vehicle_type.name not in types:
                    types.append(query.vehicle_type.name)
                    return_list.append(
                        [query.vehicle_type.name, query.vehicle_type.price, query.vehicle_id])

            return Response(return_list)
        elif request.GET.get("1") == 'get_vehicle_to_move':
            return_list = []
            types = []
            queryset = Vehicle.objects.all()
            queryhubs = Hub.objects.filter(hub_loc=request.GET.get("2"))
            hub_id = queryhubs[0].hub_id
            queryset = Vehicle.objects.filter(hub=hub_id, status=1)

            for query in queryset:
                if query.vehicle_type not in types:
                    types.append(query.vehicle_type)

            for type in types:
                queryType = Vehicle.objects.filter(
                    hub=hub_id, vehicle_type=type, status=1)
                vehicles = []
                for q in queryType:
                    vehicles.append(q.vehicle_id)
                return_list.append(
                    [queryType[0].vehicle_type.name, queryType[0].vehicle_type.price, vehicles])

            return Response(return_list)
        elif request.GET.get("1") == 'get_vehicles':
            queryset = Vehicle.objects.all()
            return_list = []
            for query in queryset:
                data = [query.vehicle_id, query.battery, query.needs_repair,
                        query.status, query.vehicle_type.name, query.hub.hub_loc, query.defect]
                return_list.append(data)
            return Response(return_list)
        else:
            query = Trip.objects.filter(is_active=True, user_id=id)
            # query[0].end_loc = 'Completed'
            time = datetime.now(timezone.utc)
            _trip = Trip.objects.get(pk=query[0].trip_id)
            _trip.end_time = time
            _trip.save(update_fields=['end_time'])
            total_cost, time, mins = calculateCost(
                _trip.start_time, _trip.end_time, _trip.vehicle_id.vehicle_type.price)
            vehicle_type = _trip.vehicle_id.vehicle_type.name
            vehicle_id = _trip.vehicle_id.vehicle_id
            _trip.fare = total_cost
            _trip.save(update_fields=['fare'])
            battery_start = _trip.vehicle_id.battery
            battery_end = battery_start - mins
            if battery_end < 0:
                battery_end = 0
            _trip.vehicle_id.battery = battery_end
            _trip.vehicle_id.save(update_fields=['battery'])
            return Response([total_cost, time, vehicle_type, vehicle_id, _trip.trip_id])


class VehicleViewSet(APIView):

    # def get(self, request, format=None):
    #     vehicle = Vehicle.objects.all()
    #     serializer = VehicleSerializer(vehicle, many=True)
    #     return Response(serializer.data)

    def get(self, request, pk, format=None):
        vehicle = Vehicle.objects.get(vehicle_id=pk)
        serializer = VehicleSerializer(vehicle)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        vehicle = Vehicle.objects.get(vehicle_id=pk)
        serializer = VehicleSerializerPut(vehicle, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TripViewSet(APIView):

    def get(self, request, pk, format=None):
        trips = Trip.objects.get(trip_id=pk)
        serializer = TripSerializer(trips)
        return Response(serializer.data)


class TripsViewSet(APIView):

    def get(self, request):
        trips = Trip.objects.all()
        serializer = TripSerializer(trips, many=True)
        return Response(serializer.data)


class TripSet(APIView):
    queryset = Trip.objects.all()

    def get(self, request):
        current_user = request.user
        id = request.user.id
        queryset = Trip.objects.filter(user_id=id, is_active=True)
        if len(queryset) != 0:
            return Response([False, True])
        else:
            return Response([True, False])


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request, pk, format=None):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @csrf_exempt
    @api_view(['POST'])
    def delete_user(request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = User.objects.get(pk=request.user.id)
        if user.check_password(body['password']):
            _trip = Trip.objects.filter(user_id=request.user.id)
            if len(_trip) > 0:
                for _ in _trip:
                    _.delete()
            _wa = WalletActivity.objects.filter(user_id=request.user.id)
            if len(_wa) > 0:
                for _ in _wa:
                    _.delete()
            User.objects.get(pk=request.user.id).delete()
            return Response("User deleted")
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # except:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    @api_view(['POST'])
    def change_password(request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        try:
            user = User.objects.get(pk=request.user.id)
            user.set_password(body['newPassword'])
            user.save()
            return Response("Password Changed succesfully")
        except:
            return Response(status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    @api_view(['POST'])
    def verify_password(request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = User.objects.get(pk=request.user.id)
        serializer = UserSerializer(user, data=request.data)
        try:
            if user.check_password(body['oldPassword']):
                return Response("Yes")
            else:
                return Response(status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    @api_view(['POST'])
    def register(request):

        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        role = 0
        if "operator.velo.org" in body['email']:
            role = 1
        elif "manager.velo.org" in body['email']:
            role = 2

        User.objects.create_user_from_view(
            body['firstName'], body['lastName'], body['email'], body['email'], role, body['password'])
        return Response("")


class VehicleView(APIView):
    def get(self, request, format=None):
        vehicles = Vehicle.objects.all()
        response = []
        for v in vehicles:
            serializer = VehicleSerializer(v)
            response.append(serializer.data)
        return Response(response)


class WalletActivityView(APIView):
    def get(self, request, pk, format=None):
        wallet = WalletActivity.objects.filter(user_id=pk)
        response = []
        for w in wallet:
            serializer = WalletActivitySerializer(w)
            response.append(serializer.data)
        return Response(response)

    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        serializer = WalletActivitySerializer(data=body)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WalletView(APIView):
    serializer_class = WalletSerializer
    queryset = Wallet.objects.all()

    def get(self, request, pk, format=None):
        wallet = Wallet.objects.get(wallet_id=pk)
        serializer = WalletSerializer(wallet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        wallet = Wallet.objects.get(wallet_id=pk)
        serializer = WalletSerializer(wallet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BankView(APIView):
    serializer_class = BankAccountSerializer
    queryset = Bank_Account.objects.all()

    def get(self, request, pk, format=None):
        bank = Bank_Account.objects.get(account_number=pk)
        serializer = BankAccountSerializer(bank)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        bank = Bank_Account.objects.get(account_number=pk)
        serializer = BankAccountSerializer(bank, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user
        content = {
            'thisShit': 'authenticated?',
        }
        return Response(content)
