from flask import Flask, jsonify, request
from flask_cors import cross_origin
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import requests

# Init app
app = Flask(__name__)
# CORS(app)

#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:060798me@localhost/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Empresas(db.Model):
  __tablename__ = 'empresas'
  id = db.Column(db.Integer, primary_key=True)
  nome = db.Column(db.String(200), unique=True)
  cod_empresa = db.Column(db.String(10), unique=True)

  def __init__(self, nome, cod_empresa):
    self.nome = nome
    self.cod_empresa = cod_empresa

#Conexão para executar querys com SQL puro
connection = psycopg2.connect(user="postgres",
                                    password="060798me",
                                    host="127.0.0.1",
                                    port="5432",
                                    database="postgres")  

#Rotas
@app.route('/bovespa', methods = ['GET'])
@cross_origin()
def exportBovespa():

  try:
    resp = requests.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=^BVSP&apikey=SKEPCPG07XS4L38K")
    
    bov_data = resp.json()['Global Quote']['05. price']
    
    bov_data = ('{0:,}'.format(round(float(bov_data))).replace(',','.'))

    return jsonify({"valor" : bov_data})
  except:
    print('erro na api')
    
    return(jsonify({"valor" : "try again soon"}))
  
@app.route('/consulta', methods = ['POST'])
@cross_origin()
def exportConsulta():

  req = request.json['cod_empresa']

  try:
    resp = requests.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={}&apikey=SKEPCPG07XS4L38K".format(req))
    
    emp_data = resp.json()['Global Quote']['05. price']

    return jsonify({"valor" : emp_data })

  except:
    print('erro na api')
    
    return(jsonify({"valor" : "try again soon"}))

@app.route('/save-personalizada', methods = ['POST'])
@cross_origin()
def savePersonalizada():

  req = request.json
  cursor = connection.cursor()
  cursor.execute("select cod_empresa from empresas")
  empresas_records = cursor.fetchall()

  lista_empresas = [ i[0] for i in empresas_records]

  for i in req:
    if i['cod_empresa'] not in lista_empresas:
      cursor.execute("insert into empresas(nome, cod_empresa) values('{}','{}') ".format(i['empresa'], i['cod_empresa']))
      connection.commit()

  return 'Empresas adicionadas!'
  
@app.route('/export-personalizada', methods = ['GET'])
@cross_origin()
def exportPersonalizada():

  cursor = connection.cursor()
  cursor.execute("select nome, cod_empresa from empresas")
  empresas_records = cursor.fetchall()

  resp = []
  prices = []

  # populando dic de resposta com dados do banco 
  for i in empresas_records:
    resp.append({
      "empresa" : i[0],
      "cod_empresa" : i[1],
    })
  
  # fazendo consultas a API
  for i in resp:
    try:
      price = requests.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={}&apikey=SKEPCPG07XS4L38K".format(i['cod_empresa']))
      prices.append(price.json()['Global Quote']['05. price'])
    except:
      prices.append('erro')

 
  # populando dic de resposta com resultados da requisição a API
  
  for w,j in enumerate(resp):
    j['price'] = prices[w]

  
  return jsonify(resp)
      
@app.route('/delete-personalizada', methods = ['DELETE'])
@cross_origin()
def deletePersonalizada():

  req = request.json
  cursor = connection.cursor()
  cursor.execute("select cod_empresa from empresas")
  empresas_records = cursor.fetchall()

  lista_empresas = [ i[0] for i in empresas_records]

  for i in req:
    if i['cod_empresa'] in lista_empresas:
      cursor.execute("delete from empresas as emp where emp.cod_empresa = '{}'".format(i['cod_empresa']))
      connection.commit()

  return 'Empresas removidas!'


if __name__ == '__main__' :

  app.run(host='127.0.0.1', port='5001', debug=True)


