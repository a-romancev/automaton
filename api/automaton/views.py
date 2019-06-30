import json

from django.http import HttpResponse
from django.views import generic
from automaton.models import Field
from secure.decorators import authorized

class FieldView(generic.View):
    @authorized
    def post(self, request):
        field = json.loads(request.body)
        Field.objects.create(data=field['data'], user=request.user, name=field['name'])

        return HttpResponse()

    @authorized
    def get(self, request):
        obj = Field.objects.filter(user=request.user).order_by('id').last()
        field = {'data': obj.data}

        return HttpResponse(json.dumps(field))

class ListView(generic.View):
    @authorized
    def get(self, request):
        field_list = []
        for field in Field.objects.filter(user=request.user).order_by('id'):
            field_list.append({'name': field.name, 'id': field.id})

        return HttpResponse(json.dumps(field_list))
