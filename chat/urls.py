from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^lowhigh/(?P<code>[-\w]+)/$', views.lowhigh, name='lowhigh'),
    url(r'^online/$', views.online, name='online'),
    url(r'^save/$', views.save, name='save'),
    url(r'^$', views.index, name='index'),
]
