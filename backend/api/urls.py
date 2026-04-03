from django.urls import path
from .views import PredictView, PredictionListView, HealthCheckView

urlpatterns = [
    path('v1/predict/', PredictView.as_view()),
    path('v1/predictions/', PredictionListView.as_view()),
    path('v1/health/', HealthCheckView.as_view()),
]