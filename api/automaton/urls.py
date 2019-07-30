from django.urls import path, include
from automaton import views

urlpatterns = [
    path('field/', views.FieldView.as_view(), name='create_field'),
    path('field/<int:obj_id>/clone/', views.CloneFieldView.as_view(), name='field_clone'),
    path('field/<int:obj_id>/rate/', views.RateFieldView.as_view(), name='field_rate'),
    path('field/<int:obj_id>/', views.FieldView.as_view(), name='field'),
    path('field_list/', views.FieldListView.as_view(), name='field_list'),
    path('field_rating_list/', views.FieldRatingListView.as_view(), name='field_rating_list'),
    path('mutator/', views.MutatorView.as_view(), name='mutator'),
    path('mutator/<int:obj_id>/', views.MutatorView.as_view(), name='mutator_id'),
    path('mutator_list/', views.MutatorListView.as_view(), name='mutator_list'),
]

