from chat.models import Message
from django.contrib.auth.models import User
import random
from django.utils import timezone

for i in range(100):
	id = random.randint(2,3)
	user = User.objects.get(pk=id)
	user.message_set.create(text='comentario '+str(i), post_date=timezone.now())