import urllib.request
from xml.dom import minidom

code= 'AAPL'
url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+code+"%22)&env=store://datatables.org/alltableswithkeys"
doc = urllib.request.urlopen(url)
xmldoc = minidom.parse(doc)

DaysLow = xmldoc.getElementsByTagName('DaysLow')[0].firstChild.nodeValue
DaysHigh = xmldoc.getElementsByTagName('DaysHigh')[0].firstChild.nodeValue
Name = xmldoc.getElementsByTagName('Name')[0].firstChild.nodeValue
message = code + " (" + Name + ") Days Low quote is $" + DaysLow + " and Days High quote is $" + DaysHigh + "."
print(message)