from flask import Flask
from flask_restful import Resource, Api
import requests
import nltk

app = Flask(__name__)
api = Api(app)


class MeetupEvents(Resource):
    def get(self):
        r = requests.get(
            'https://api.meetup.com/find/upcoming_events?photo-host=public&page=20&sig_id=11127355&sig=50cafaa0a03571e532062f5ebf355cdab6c1b413')
        events = r.json()
        document = events["events"][0]["description"]
        print(document)
        sentences = nltk.sent_tokenize(document)
        sentences = [nltk.word_tokenize(sent) for sent in sentences]
        sentences = [nltk.pos_tag(sent) for sent in sentences]
        nouns = []
        for sentance in sentences:
            nouns.append([word for word, pos in sentance
                          if (pos == 'NN' or pos == 'NNP' or pos == 'NNS' or pos == 'NNPS' or pos == "VB" or pos == "VBD" or pos == "VBG" or pos == "VBN") and len(word) > 3])
        return nouns


api.add_resource(MeetupEvents, '/')

if __name__ == '__main__':
    app.run(debug=True)
