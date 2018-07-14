import sys
import json
from pprint import pprint
import unicodedata

def removeAccents(string):
	nfkd_form = unicodedata.normalize("NFKD", str(string))
	return u"".join([c for c in nfkd_form if not unicodedata.combining(c)])

data = json.loads(open(sys.argv[1], "rb").read()[5:])

f = open(sys.argv[2], "wb")

newdata = []

for key, value in data.items():
	if key != '' and '' not in value:
		newdata.append([removeAccents(key).lower().replace('\"', ''), key, value])

newdata.sort(key=lambda d: d[0])

index = ""
indexobj = {}

for i, item in enumerate(newdata):
	if item[0][0] != index:
		index = item[0][0]
		indexobj[item[0][0]] = i

f.write("lang = ".encode("utf-8"))
f.write(json.dumps(newdata, ensure_ascii=False).encode("utf-8"))
f.write("\nindex = ".encode("utf-8"))
f.write(json.dumps(indexobj, ensure_ascii=False).encode("utf-8"))