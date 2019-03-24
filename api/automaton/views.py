import json

from django.http import HttpResponse
from django.views import generic
from automaton.models import Field


class FieldView(generic.View):
    def post(self, request):
        field = json.loads(request.body)
        Field.objects.create(data=field['data'])

        return HttpResponse()

    def get(self, request):
        obj = Field.objects.order_by('id').last()
        field = {'data': obj.data}

        return HttpResponse(json.dumps(field))
