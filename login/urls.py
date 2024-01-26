from django.urls import path
from . import views

urlpatterns = [
    path('lawyer',views.index2),
    path('user',views.index5),
    path('user_login',views.user_login),
    path('lawyer_login',views.lawyer_login),
]
