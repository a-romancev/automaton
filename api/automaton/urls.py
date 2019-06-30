from django.urls import path, include
from automaton import views

urlpatterns = [
    path('field/', views.FieldView.as_view(), name='field'),
    path('field_list/', views.ListView.as_view(), name='field_list'),
]
