from django.urls import path
from automaton import views

urlpatterns = [
    path('field/', views.FieldView.as_view(), name='field'),
    path('register/', views.RegisterView.as_view(), name='register'),
]
