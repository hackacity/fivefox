
import nltk
import unidecode
from nltk.tokenize import TweetTokenizer
import nlpnet

#tknzr = TweetTokenizer()

text = "CARTAO DE PULSO TELEFONICO (FIXO) CEDULA DE DINHEIRO NACIONAL Celular CRLV PENEIRA  Substância:COCAINA TESOURA  Veículo:HONDA BIZ 125 ES Placa:HSU2058  Veículo:VOLKSWAGEN GOL 1.6 RALLYE Placa:NRN0843"
tokenizado =  tknzr.tokenize(text)
print(tokenizado)

unaccented_string = unidecode.unidecode(tokenizado)
#textoParaPos = word_tokenize(unaccented_string)
tageado = nltk.pos_tag(tokenizado)
print('tagueado', tageado)


tagger = nlpnet.POSTagger('/path/to/pos-model/', language='pt')
tagger.tag('O rato roeu a roupa do rei de Roma.')