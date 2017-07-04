from django.db import models
from django.contrib.auth.models import User

# Create your models here.
#class User(models.Model):
	#name = models.CharField(max_length=200)
	
	#def __str__(self):
	#	return 'Nombre: '+self.name

class Message(models.Model):
	user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
	text = models.CharField(max_length=200)
	post_date = models.DateTimeField('date posted')

	class Meta:
		ordering = ['-post_date']

	def __str__(self):
		return 'Texto: '+self.text+' ('+str(self.post_date)+')'

	
