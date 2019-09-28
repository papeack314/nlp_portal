from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from . import forms
from . import utils
import json
import spacy
from spacy import displacy


# Create your views here.

# Webページ用のView
def index(request):
    return render(request, "spacyapp/index.html", {})

def pos_tagging(request):
    return render(request, "spacyapp/pos_tagging.html", {})

def dependancy_parser(request):
    return render(request, "spacyapp/dependancy_parser.html", {})

def named_entity_recognition(request):
    return render(request, "spacyapp/named_entity_recognition.html", {})

def similarity_checker(request):
    return render(request, "spacyapp/similarity_checker.html", {})

# API用のView
def pos_tagging_api(request, input_text):
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(input_text)
    tokens = []
    for token in doc:
        pos_ja = utils.pos_tag_En_to_Ja[token.pos_]
        tokens.append({"text": token.text, "lemma": token.lemma_, "pos": pos_ja, "tag": token.tag_,
        "dep": token.dep_, "shape": token.shape_, "is_alpha": token.is_alpha, "is_stop": token.is_stop})
        # output_text = output_text + " " + token.text
        # pos_data = pos_data + " " + utils.pos_tag_En_to_Ja[token.pos_]

    return JsonResponse(tokens, safe=False)

def dependancy_parser_api(request, input_text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(input_text)
    options = {"compact": True, "bg": "#ffffff",
           "color": "black", "font": "Source Sans Pro"}
    image_html = str(displacy.render(doc, style='dep', options=options))
    ret = {"image_html": image_html}
    
    return JsonResponse(ret, safe=False)

def named_entity_recognition_api(request, input_text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(input_text)
    ner_html = str(displacy.render(doc, style="ent"))
    ret = {"ner_html": ner_html}
    return JsonResponse(ret, safe=False)
