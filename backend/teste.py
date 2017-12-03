from elasticsearch import Elasticsearch
es = Elasticsearch([{'host': '172.50.5.140', 'port': 9200}])

fieldnames = ("fact","street","number","neighborhood", "month", "day", "weekday", "year", "time", "age", "gender", "object")


res = es.search(index='bos', body={ "query": {
                                        "match_all": {}
                                    }
}, size=0
)
print(res)

res = es.search(index='bos', body={"filter": 
        {"match": 
            {"fact": "roubo"}
        }
    }, size=0
)

print(res)

#import unicodedata
#unicodedata.normalize('NFKD', title).encode('ascii','ignore')



