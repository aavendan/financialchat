from django.http import Http404
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core import serializers
from django.utils import timezone
from .models import Message
import urllib.request
from xml.dom import minidom


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

@csrf_exempt
def lowhigh(request):
	if request.is_ajax():
		if request.method == 'POST':
			code= request.POST.get('instruccion')
			url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+code+"%22)&env=store://datatables.org/alltableswithkeys"
			xmldoc = minidom.parse(urllib.request.urlopen(url))

			DaysLow = xmldoc.getElementsByTagName('DaysLow')[0].firstChild.nodeValue
			DaysHigh = xmldoc.getElementsByTagName('DaysHigh')[0].firstChild.nodeValue
			Name = xmldoc.getElementsByTagName('Name')[0].firstChild.nodeValue
			text = code + " (" + Name + ") Days Low quote is $" + DaysLow + " and Days High quote is $" + DaysHigh + "."

			user = User.objects.get(pk=request.POST.get('userid'))
			m = Message(user=user, text= text, post_date=timezone.now())
			m.save()

	messages = Message.objects.all()[:50][::-1]
	context = {'messages':messages,'user':request.user}
	return render(request, 'chat/listofmessages.html',context)