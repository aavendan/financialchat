from django.http import Http404
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from .models import Message
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
import urllib.request

@login_required
def index(request):
	try:
		user = User.objects.get(pk=request.user.id)
	except User.DoesNotExist:
		raise Http404("User does not exist")

	messages = user.message_set.all()[:50][::-1]
	context = {'messages':messages}
	return render(request, 'chat/index.html',context)

@login_required
def online(request):
	messages = Message.objects.all()[:50][::-1]
	context = {'messages':messages,'user':request.user}
	return render(request, 'chat/chat.html',context)


def lowhigh(request):
	url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22AAPL%22)&env=store://datatables.org/alltableswithkeys"
	doc = urllib.request.urlopen(url)
	return HttpResponse(doc.read(), content_type='text/xml')