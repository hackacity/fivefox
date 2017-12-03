from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource

import geopy.distance
import es_sql
from flask_cors import CORS
from elasticsearch import Elasticsearch
from datetime import datetime
from datetime import timedelta
es = Elasticsearch([{'host': '172.50.5.140', 'port': 9200}])

app = Flask(__name__)
api = Api(app)
CORS(app)

def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in TODOS:
        abort(404, message="Todo {} doesn't exist".format(todo_id))

parser = reqparse.RequestParser()
parser.add_argument('task')

class InfoTotal(Resource):
    def get(self):
        dado = {}
        dado['total'] = es.search(index='bos', body={
				        'size' : 0,
				        'query': {
				            'match_all' : {}
				       }
				   }
				)['hits']['total']

        dado['incidentes'] = []

        dado['incidentes'].append({'roubo':  es.search(index='bos', body={"filter": 
                {"match": 
                    {"fact": "roubo"}
                }
            }, size=0
        )['hits']['total']})

        dado['incidentes'].append({'furto': es.search(index='bos', body={"filter": 
                {"match": 
                    {"fact": "furto"}
                }
            }, size=0
        )['hits']['total']})

        dado['incidentes'].append({'homicidio': es.search(index='bos', body={"filter": 
                {"match": 
                    {"fact": "homicidio"}
                }
            }, size=0
        )['hits']['total']})

        dado['incidentes'].append({'tentativa de homicidio': es.search(index='bos', body={"filter": 
                {"match": 
                    {"fact":{

                        "query":"tentativa de homicidio",
                    "operator" : "and"	
                    }
                    }
                    
                }
            }, size=0
        )['hits']['total']})

        dado['incidentes'].append({"trafico de drogas": es.search(index='bos', body={"filter": 
                {"match": 
                    {"fact":{

                        "query":"trafico de drogas",
                    "operator" : "and"	
                    }
                    }
                    
                }
            }, size=0
        )['hits']['total']})

        return dado

class Info(Resource):
    def get(self):
        total = self.obterNumeroTotalDeIncidentes()
        tamanho = 1000
        info = {'incidentes': []}
        for i in range(int(total/tamanho) + 1):
            res = self.obterDados(i*1000, tamanho)
            dados = self.parsearDados(res)
            info['incidentes'] = info['incidentes'] + dados
        
        info['total'] = len(info['incidentes'])
        return info
    
    def obterNumeroTotalDeIncidentes(self):
        return es.search(index='bos', body={
				        'size' : 0,
				        'query': {
				            'match_all' : {}
				       }
				   }
				)['hits']['total']

    def obterDados(self, inicio, tamanho): 
        res = es.search(index='bos', body={ "query": {
                                        "match_all": {}
                                    }
                                },
                                size=tamanho, from_=inicio
        )
        return res 

    def parsearDados(self, dados): 
        objetoDeRetorno = []

        dados = dados['hits']
        for caso in dados['hits']:
            ocorrencia = caso['_source']
            dado = {
                'bairro': ocorrencia['neighborhood'],
                'ano': ocorrencia['year'], 
                'latitude': ocorrencia['latitude'],
                'dia': ocorrencia['day'],
                'tipo': ocorrencia['fact'], 
                'longitude': ocorrencia['longitute'],
                'objeto': ocorrencia['object'],
                'hora': ocorrencia['time'],
                'diaDaSemana': ocorrencia['weekday'],
                'mes': ocorrencia['month']
            }
            objetoDeRetorno.append(dado)
        return objetoDeRetorno

class BOs(Resource):
    def get(self):
        latitude = request.args.get('lat', type = float)
        longitude = request.args.get('long', type = float)
        raio = request.args.get('raio', type = float)

        now = datetime.now()
        month_ago = (now - timedelta(days=30)).month
        day_month_ago = (now - timedelta(days=30)).day
        year_ago = 2011
        #year_ago = (now - timedelta(days=30)).year
        month = now.month
        day = now.day
        year = 2011
        #year = now.year

        c1 = (latitude, longitude)
        res = es_sql.execute_sql('http://172.50.5.140:9200', '''SELECT * FROM bos WHERE "month"=''' + str(month_ago) + ''' AND "day">=''' + str(day_month_ago)+ ''' AND "year"=''' + str(year_ago) + ''' LIMIT 10000''')
    
        inside = []
        for i in res['result']:
            c2 = (i['latitude'], i['longitute'])
            if geopy.distance.vincenty(c1, c2).km <= raio:
                inside.append(i)

        res = es_sql.execute_sql('http://172.50.5.140:9200', '''SELECT * FROM bos WHERE "month"=''' + str(month) + ''' AND "day"<=''' + str(day) + ''' AND "year"=''' + str(year) + ''' LIMIT 10000''')
        for i in res['result']:
            c2 = (i['latitude'], i['longitute'])
            if geopy.distance.vincenty(c1, c2).km <= raio:
                inside.append(i)

        resultado = []
        for i in inside:
            dado = {
                'bairro': i['neighborhood'],
                'ano': i['year'], 
                'latitude': i['latitude'],
                'dia': i['day'],
                'tipo': i['fact'], 
                'longitude': i['longitute'],
                'objeto': i['object'],
                'hora': i['time'],
                'diaDaSemana': i['weekday'],
                'mes': i['month'],
                'genero': i['gender'],
                'idade': i['age']
            }
            resultado.append(dado)

        return resultado

api.add_resource(Info, '/info')
api.add_resource(InfoTotal, '/info/total')
api.add_resource(BOs, '/bo')

if __name__ == '__main__':
    app.run(debug=True)