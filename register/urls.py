from django.urls import path
from . import views

urlpatterns=[path('lawyer',views.index3),
             path('submit_lawyer',views.LawyerSignUpView.as_view()),
             path('submit_user',views.UserSignUpView.as_view()),
             path('user',views.index4)]