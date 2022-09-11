from posixpath import basename
from django.urls import include, path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


urlpatterns = [
    path('pets/', views.AllPetsView.as_view()),
    path('', views.GetReq.as_view()),
    path('pet/<int:pk>', views.SinglePetView.as_view()),
    path('extractface', views.TestFaceExtract.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
