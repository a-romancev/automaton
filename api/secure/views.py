import json

from django.http import HttpResponse
from django.views import generic
from django.contrib import auth
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.http import HttpResponseForbidden

from secure.models import Token


class RegisterView(generic.View):
    def post(self, request):
        user_data = json.loads(request.body)

        if User.objects.filter(username=user_data['login']).exists():
            return HttpResponse(json.dumps({'error': 'user already exists'}))

        user = User.objects.create_user(
            username=user_data['login'],
            email=user_data['login'],
            password=user_data['password'],
        )

        key = get_random_string(length=64)
        Token.objects.create(user=user, key=key)

        resp = HttpResponse(json.dumps({'id': user.id}))
        resp.set_cookie(key="token", value=key, httponly=True)
        return resp

class LoginView(generic.View):
    def post(self, request):
        user_data = json.loads(request.body)
        user = auth.authenticate(request, username=user_data['login'], password=user_data['password'])
        if not user.is_active:
            return HttpResponse(json.dumps({'error': 'login error'}))

        key = get_random_string(length=64)
        Token.objects.create(user=user, key=key)

        resp = HttpResponse(json.dumps({'id': user.id}))
        resp.set_cookie(key="token", value=key, httponly=True)
        return resp

    def get(self, request):
        try:
            token = Token.objects.get(key=request.COOKIES.get('token'))
        except Token.DoesNotExist:
            return HttpResponseForbidden()
        return HttpResponse()

