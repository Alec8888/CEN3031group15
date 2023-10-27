from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import oracledb

connection = oracledb.connect(
    user="esteban.medero",
    password="a6K5TDvHuejguhGFgAGBhEKI",
    dsn="oracle.cise.ufl.edu:1521/orcl")

print("Successfully connected to Oracle Database")

def index(request):
    return HttpResponse("Hello, world. You're at the home index.")
