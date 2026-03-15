from django.urls import path
from base import views




from django.urls import path, include


urlpatterns = [
    path('users/login/', views.login, name='login'),
    path('users/logout/', views.logout, name='logout'),
    path('users/me/', views.me, name='me'),
    path('', views.get_json_file),
    
    
    # path('api/predict/', views.predict, name='predict'),
    
    # path('api/analytics/', views.analytics, name='analytics'),
]