import json

from django.http import HttpResponse
from django.views import generic
from automaton.models import Field, Mutator, FieldRating
from secure.decorators import authorized
from django.db.models import Avg


class FieldView(generic.View):
    @authorized
    def post(self, request, obj_id=None):
        if not obj_id:
            data = []
            for i in range(10):
                data.append([])
                for _ in range(18):
                    data[i].append(False)
            obj = Field.objects.create(user=request.user, name='no name', data=data, color="#49A078")
            return HttpResponse(json.dumps({'id':obj.id}))

        field = json.loads(request.body)
        if field['mutator_id'] is None:
            return HttpResponse(json.dumps({'error': 'You did not select a mutator'}))
        updated = Field.objects.filter(user=request.user, id=obj_id).update(
            name=field['name'],
            data=field['data'],
            mutator_id=field['mutator_id'],
            color=field['color'],
        )
        if not updated:
            return HttpResponse(json.dumps({'error': 'You cant save fields you dont own'}))
        return HttpResponse(json.dumps({'id': obj_id}))

    @authorized
    def get(self, request, obj_id):
        try:
            obj = Field.objects.get(id=obj_id)
            if obj.mutator:
                field = {'data': obj.data, 'name': obj.name, 'mutator_id': obj.mutator_id, 'mutator': {'rules': obj.mutator.rules}, 'color': obj.color}
            else:
                field = {'data': obj.data, 'name': obj.name, 'mutator_id': obj.mutator_id, 'mutator': {'rules': []}, 'color': obj.color}
        except Field.DoesNotExist:
            return HttpResponse(json.dumps({'error': 'Field does not exist'}))

        return HttpResponse(json.dumps(field))

    @authorized
    def delete(self, request, obj_id):
        try:
            Field.objects.filter(user=request.user, id=obj_id).delete()
        except Field.DoesNotExist:
            return HttpResponse(json.dumps({'error': 'Field does not exist'}))
        return HttpResponse()


class FieldListView(generic.View):
    @authorized
    def get(self, request):
        field_list = []
        for field in Field.objects.filter(user=request.user).order_by('id'):
            field_list.append({'name': field.name, 'id': field.id})

        return HttpResponse(json.dumps(field_list))


class FieldRatingListView(generic.View):
    @authorized
    def get(self, request):
        field_list = []
        for field in Field.objects.annotate(rating=Avg('field_ratings__rating')).order_by('rating'):
            field_list.append({'name': field.name, 'id': field.id, 'rating': field.rating})

        return HttpResponse(json.dumps(field_list))


class MutatorView(generic.View):
    @authorized
    def post(self, request, obj_id=None):
        if not obj_id:
            obj = Mutator.objects.create(user=request.user, name='no name')
            return HttpResponse(json.dumps({'id': obj.id}))

        mutator = json.loads(request.body)
        Mutator.objects.filter(user=request.user, id=obj_id).update(name=mutator['name'], rules=mutator['rules'])
        return HttpResponse(json.dumps({'id': obj_id}))

    @authorized
    def get(self, request, obj_id):
        try:
            obj = Mutator.objects.get(id=obj_id)
            mutator = {'name': obj.name, 'id': obj.id, 'rules': obj.rules}
        except Mutator.DoesNotExist:
            return HttpResponse(json.dumps({'error': 'Mutator does not exist'}))
        return HttpResponse(json.dumps(mutator))

    @authorized
    def delete(self, request, obj_id):
        deleted, _ = Mutator.objects.filter(user=request.user, id=obj_id).delete()
        if not deleted:
            return HttpResponse(json.dumps({'error': 'Mutator does not exist'}))
        return HttpResponse()


class MutatorListView(generic.View):
    @authorized
    def get(self, request):
        mutator_list = []
        for mutator in Mutator.objects.filter(user=request.user).order_by('id'):
            mutator_list.append({'name': mutator.name, 'id': mutator.id})

        return HttpResponse(json.dumps(mutator_list))


class CloneFieldView(generic.View):
    @authorized
    def post(self, request, obj_id):
        try:
            obj = Field.objects.get(id=obj_id)
            obj.user = request.user
            obj.id = None
            obj.save()
        except Field.DoesNotExist:
            return HttpResponse(json.dumps({'error': 'Field does not exist'}))

        return HttpResponse(json.dumps(obj.id))


class RateFieldView(generic.View):
    @authorized
    def post(self, request, obj_id):
        data = json.loads(request.body)
        rating = FieldRating.objects.get_or_create(user=request.user, field_id=obj_id, rating=1)
        rating.update(rating=data['rating'])
        rating.save()
        return HttpResponse()
