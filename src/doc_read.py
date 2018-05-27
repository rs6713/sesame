import PyPDF2
import argparse
import nltk
import sys
from nltk.tokenize import sent_tokenize, \
           word_tokenize, WordPunctTokenizer

from nltk.stem.snowball import SnowballStemmer

from sklearn.datasets import fetch_20newsgroups
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer

from nltk.classify import NaiveBayesClassifier
from nltk.classify.util import accuracy as nltk_accuracy
import numpy as np
from sentences import sentences 
import matplotlib.pyplot as plt 
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report

input_file='data/healthcare.pdf'
def analyzeFile(input_file):
    #Initialisation
    snowball = SnowballStemmer('english')
    healthplan={ "raw_text": "","number_pages":0 }
    keywords=["autism", "prosthetics", "disability", "disabled",  "learning disability",\
    "prostheses", "physiotherapy", "deaf", "blind", "chronic conditions","hearing loss", "physiotherapist",\
    "mental health", "autistic spectrum disorder", "autistic", "aspergers", "ADHD", "attention defecit disorder", \
    "speech therapy", "dyslexia", "dyspraxia","learning disorders", "speech delay", "genetic screening", \
    "cystic fibrosis", "visual impairment", "blindness", "deaf-blindness", "ABI", "acquired brain injury", "prosthesis"]

    keywords_lem=list(map( lambda x: snowball.stem(x), keywords))

    #Import pdf 
    pdfFileObj = open(input_file,'rb')     #'rb' for read binary mode
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    print("Number of pages in document:", pdfReader.numPages)
    healthplan["number_pages"]= pdfReader.numPages

    for i in range(healthplan["number_pages"]):
        healthplan["raw_text"]+= pdfReader.getPage(i).extractText().replace("\n", "")
        print("Processed ", round(i/healthplan["number_pages"]*100,2), "% of documents")

    #Tokenisation and lemmisation of document
    #strip removes trailing and leading from provided  string, not good for whole document
    #translate quicker than replace, quicker than list concatenation ignoring badchars
    print(healthplan["raw_text"][:500])
    table = str.maketrans(dict.fromkeys("(){}<>,'\t"))
    healthplan["raw_text"]=healthplan["raw_text"].translate(table)
    print(healthplan["raw_text"][:500])
    healthplan["words"]=word_tokenize(healthplan["raw_text"])
    print(healthplan["words"][:50])
    healthplan["sentences"]=sent_tokenize(healthplan["raw_text"])
    print(healthplan["sentences"][:10])

    #Perform stemmisation
    healthplan["words"]= list(map(lambda x : snowball.stem(x), healthplan["words"]))

    #Could optionally do text chunking, so not limited by sentences
    #I'm going to combine n sentences to form sentence chunks
    healthplan["chunks"]=[]
    chunksize=1
    print("Number Document sentences: ",len(healthplan["sentences"]))
    for i in range(0, len(healthplan["sentences"]), chunksize):
        healthplan["chunks"].append(  ' '.join(healthplan["sentences"][i:(i)+chunksize]))
    print("Number Document chunks: ",len(healthplan["chunks"]))
    #Sentence category prediction

    category_map = {'sci.med': 'Medicine'}

    categories=['alt.atheism',
    'comp.graphics',
    'comp.os.ms-windows.misc',
    'comp.sys.ibm.pc.hardware',
    'comp.sys.mac.hardware',
    'comp.windows.x',
    'misc.forsale',
    'rec.autos',
    'rec.motorcycles',
    'rec.sport.baseball',
    'rec.sport.hockey',
    'sci.crypt',
    'sci.electronics',
    'sci.space',
    'soc.religion.christian',
    'talk.politics.guns',
    'talk.politics.mideast',
    'talk.politics.misc',
    'talk.religion.misc']

    for c in categories:
        category_map[c]="Other"

    # Get the training dataset
    training_data = fetch_20newsgroups(subset='train',
        categories=category_map.keys(), shuffle=True, random_state=5)

    #print(training_data.data[0])

    #extract term counts
    count_vectorizer = CountVectorizer()
    train_tc = count_vectorizer.fit_transform(training_data.data)

    #train term freq inversion
    tfidf = TfidfTransformer()
    train_tfidf = tfidf.fit_transform(train_tc)

    #Train a Multinomial Naive Bayes classifier
    classifier = MultinomialNB().fit(train_tfidf, training_data.target)

    # Transform input data using count vectorizer
    input_tc = count_vectorizer.transform(healthplan["chunks"])
    # Transform vectorized data using tfidf transformer
    input_tfidf = tfidf.transform(input_tc)

    # Predict the output categories
    predictions = classifier.predict(input_tfidf)

    no_outputs=10
    # Print the outputs
    for sent, category in zip(healthplan["chunks"][:no_outputs], predictions[:no_outputs]):
        print('\nInput:', sent, '\nPredicted category:', category_map[training_data.target_names[category]])

    #only include medicine relevant 
    print("Percentage of document medicine related: ", round(sum(predictions)/len(predictions),2), "% : ", sum(predictions) )

    #healthplan["chunks"]=healthplan["chunks"][predictions=="Medicine"]

    #leminize words in chunks, compare to leminized keywords
    #print chunks where relevant. If last/first sentence, group with previous?
    healthplan["chunks_lem"]= [ [snowball.stem(s) for s in word_tokenize(c)] for c in healthplan["chunks"]]

    print("Disability key words: ", keywords_lem)

    healthplan["disabled_chunks_lem"]=[ (i,list(set(c).intersection(set(keywords_lem)))) if set(c).intersection(set(keywords_lem)) else (i,None) for i,c in enumerate(healthplan["chunks_lem"]) ]
    print("Number of disability sentences: ", len(healthplan["disabled_chunks_lem"])-healthplan["disabled_chunks_lem"].count(None))

    print("Percentage of document disability related: ", len(healthplan["disabled_chunks_lem"])-healthplan["disabled_chunks_lem"].count(None))

    healthplan["disabled_chunks"]=[]
    for i,c in enumerate(healthplan["chunks"]):
        if(healthplan["disabled_chunks_lem"][i][1]!=None):
            print("Sentence: ", c)
            healthplan["disabled_chunks"].append([int(i),c])
            print("Key words: ", healthplan["disabled_chunks_lem"][i] )

    print("\n", "#"*10, "\n")
    #Returned sentences that relate to disability topics
    for c in healthplan["disabled_chunks"]:
        print(c)
    #print(np.array(healthplan["disabled_chunks"])[:,1])
    '''
    for i,c in enumerate(healthplan["chunks"]):
        if "prosthesis" in c:
            print("Index ",i,": ", healthplan["chunks_lem"][i], healthplan["disabled_chunks_lem"][i])
            print("Original sentence: ", c)
            print("previous sebtebces", healthplan["chunks"][i-5:i])
    print("Percentage of medical sentences disability related: ", round((len(healthplan["disabled_chunks_lem"])-healthplan["disabled_chunks_lem"].count(None))/len(healthplan["chunks_lem"]),2), "% : ", (len(healthplan["disabled_chunks_lem"])-healthplan["disabled_chunks_lem"].count(None)))

    print("\n", "#"*20, "\n")
    for i,c in enumerate(healthplan["sentences"]):
        if "prosthesis" in c:
            print("Index ",i,": ", healthplan["chunks_lem"][i], healthplan["disabled_chunks_lem"][i])
            print("Original sentence: ", c)
            print("previous sebtebces", healthplan["sentences"][i-5:i])
            '''
    print("\n", "#"*20, "\n")
    print(sentences)
    sentences=[ (s[0], [snowball.stem(w) for w in word_tokenize(s[1])]) for s in sentences]
    print("\n", "#"*20, "\n")


    #Convert sentence features using bag of words model
    def extract_features(words):
        return dict([(word, True) for word in words])
    #split sentences into pos, neg, neut training/testing
    trainsplit=0.8
    features_pos, features_neg, features_neut= [],[],[]
    for s in sentences:
        if(s[0]==0):
            print("I am a positive sentence:",s[1])
            features_neut.append(( extract_features(s[1]), "neutral"))
        elif(s[0]==1):
            features_pos.append((extract_features(s[1]), "positive"))
        else:
            features_neg.append((extract_features(s[1]), "negative"))
    num_neut, num_pos, num_neg= list(map(int,    np.array([len(features_neut),len(features_pos),len(features_neg)])*trainsplit))

    features_test=features_neut[num_neut:]+features_pos[num_pos:]+features_neg[num_neg:]
    features_train= features_neut[:num_neut]+features_pos[:num_pos]+features_neg[:num_neg]



    #sentence sentiment analysis

    # Train a Naive Bayes classifier


    classifier = NaiveBayesClassifier.train(features_train)
    print('\nAccuracy of the classifier:', nltk_accuracy(classifier, features_test))

    '''
    #predictions=classifier.predict(features_test)
    #Create Confusion Matrix
    confusion_mat=confusion_matrix(np.array(features_test)[:,1], predictions)

    #Visualize Confusion Matrix
    plt.imshow(confusion_mat, interpolation="nearest", cmap=plt.cm.spring)#, cmap=plt.cm.gray
    plt.title('Confusion Matrix')
    plt.colorbar()
    ticks=np.arange(5)
    plt.xticks(ticks,ticks)
    plt.yticks(ticks,ticks)
    plt.ylabel("True Labels")
    plt.xlabel("Predicted Labels")
    plt.show()

    #Classification Report
    targets=['Class-0', 'Class-1', 'Class-2', 'Class-3', 'Class-4']
    print('/n', classification_report(np.array(features_test)[:,1], predictions, target_names=targets))
    '''

    N = 15
    print('\nTop ' + str(N) + ' most informative words:')
    for i, item in enumerate(classifier.most_informative_features()):
        print(item)
        print(str(i+1) + '. ' + item[0])
        if i == N - 1:
            break

    print("Indexes of disability related chunks in sentences:", np.array(healthplan["disabled_chunks"])[:,0])
    print(list(map(int,np.array(healthplan["disabled_chunks"])[:,0])))
    #Go through all disability related chunks
    for i in np.array(healthplan["disabled_chunks"])[:,0]:
        # Compute the probabilities
        i=int(i)
        dis_sentence=healthplan["chunks_lem"][i]
        print("Sentence trying to sentiment classify: ", healthplan["chunks"][i])
        probabilities = classifier.prob_classify(extract_features(dis_sentence))

        # Pick the maximum value
        predicted_sentiment = probabilities.max()
        # Print outputs
        print("Predicted sentiment:", predicted_sentiment)
        print("Probability:", round(probabilities.prob(predicted_sentiment), 2))

    sys.stdout.flush()
    
analyzeFile(input_file)
'''
    for review in input_reviews:
        # Compute the probabilities
        probabilities = classifier.prob_classify(extract_features(review.split()))

        # Pick the maximum value
        predicted_sentiment = probabilities.max()
        # Print outputs
        print("Predicted sentiment:", predicted_sentiment)
        print("Probability:", round(probabilities.prob(predicted_sentiment), 2))
    '''









