from django.urls import path, re_path

from . import views

urlpatterns = [
    path('legacy', views.index, name='index'),
    path('api/overview', views.DepositionListCreate.as_view()),
    re_path(r'^api/depositions/$', views.deposition_list),
    # Regex for 0 to 999
    re_path(r'^api/depositions/([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$', views.deposition_detail)
]