from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^lowhigh/$', views.lowhigh, name='lowhigh'),
    url(r'^online/$', views.online, name='online'),
    url(r'^$', views.index, name='index'),
]
