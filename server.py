from flask import Flask, request, jsonify
from pyngrok import ngrok
from flask_cors import CORS
import requests
import mysql.connector
import pandas as pd


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="election_res"
)

mycursor = mydb.cursor()

app = Flask(__name__)
url =  "https://6ba8-35-196-242-202.ngrok-free.app"
CORS(app)
@app.route("/", methods=["POST"])
def hello_world():
    data = request.json
    data['schema']="election_res(id,state_name,assembly_constituency_name,nota_vote,candidate_name,party_name,votes_secured,parlimentary_constituency_name)  where votes_secured is total vote secured by the party" 
    response = requests.post(url, json=data)
    query= response.json()['message']
    print(query)

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    myresult=pd.DataFrame(myresult)
    myresult.to_json(orient="records")
    resss=str(myresult)
    # for x in myresult:
    #     resss=resss+"\n"+str(x)
    d2=dict()
    d2["query"]=query
    d2["table"]=resss
    d2["question"]=data['question']
    print(d2)
    res2=requests.post(url+"/message", json=d2)
    print(res2.json())
    return jsonify(message=res2.json()['message']) 

if __name__ == "__main__":
    app.run()
