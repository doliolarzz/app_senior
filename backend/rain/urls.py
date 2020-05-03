from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('rain/data', views.Data.as_view(), name='data'),
    path('rain/metrics', views.Metrics.as_view(), name='metrics')
]