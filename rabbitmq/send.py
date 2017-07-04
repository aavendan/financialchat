#!/usr/bin/env python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='hello')

texto = input('Ingrese el mensaje a enviar: ')

channel.basic_publish(exchange='',
                      routing_key='hello',
                      body=texto)
print(" [x] Sent '%s'" % texto)
connection.close()
