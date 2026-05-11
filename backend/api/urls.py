from django.urls import path
from .views import PredictView, PredictionDetailView, PredictionListView, HealthCheckView

urlpatterns = [
    path('v1/predict/', PredictView.as_view(), name='predict'),
    path('v1/predictions/', PredictionListView.as_view(), name='predictions'),
    path('v1/predictions/<int:pk>/', PredictionDetailView.as_view(), name='prediction-detail'),
    path('v1/health/', HealthCheckView.as_view(), name='health'),
]
