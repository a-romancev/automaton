import json

from django.http import HttpResponse
from django.views import generic
from automaton.models import Field
from secure.models import Token


class FieldView(generic.View):
    def post(self, request):
        field = json.loads(request.body)
        token = Token.objects.get(key=request.COOKIES.get('token'))
        user = token.user
        Field.objects.create(data=field['data'], user=user, name=field['name'])

        return HttpResponse()

    def get(self, request):
        token = Token.objects.get(key=request.COOKIES.get('token'))
        user = token.user

        obj = Field.objects.filter(user=user).order_by('id').last()
        field = {'data': obj.data}

        return HttpResponse(json.dumps(field))

class ListView(generic.View):
    def get(self, request):
        token = Token.objects.get(key=request.COOKIES.get('token'))
        user = token.user

        field_list = []
        for field in Field.objects.filter(user=user).order_by('id'):
            field_list.append({'name': field.name, 'id': field.id})

        return HttpResponse(json.dumps(field_list))
