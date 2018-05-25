from sanic import Sanic
from sanic.response import json, html, text
import os


app = Sanic()

app.static('/includes','./includes')
print("pfad ",os.getcwd())

@app.route("/")

async def test(request):

	template = open(os.getcwd() + "/templates/index.html")
	return html(template.read())

if __name__ == "__main__":

	app.run(host = "0.0.0.0", port =8902)