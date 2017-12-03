
import nltk
import unidecode
from nltk.tokenize import TweetTokenizer
import nlpnet

nltk.download('averaged_perceptron_tagger')

tknzr = TweetTokenizer()

text = "CARTAO DE PULSO TELEFONICO (FIXO) CEDULA DE DINHEIRO NACIONAL Celular CRLV PENEIRA  Substância:COCAINA TESOURA  Veículo:HONDA BIZ 125 ES Placa:HSU2058  Veículo:VOLKSWAGEN GOL 1.6 RALLYE Placa:NRN0843"
unaccented_string = unidecode.unidecode(text)
tokenizado =  tknzr.tokenize(unaccented_string)
print(tokenizado)


#textoParaPos = word_tokenize(unaccented_string)
tageado = nltk.pos_tag(tokenizado)
print('tagueado', tageado)


tagger = nlpnet.POSTagger('C:/Users/mateu/AppData/Roaming/nltk_data', language='pt')
tagger.tag(tokenizado)