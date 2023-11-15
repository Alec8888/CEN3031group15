from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.http import JsonResponse
from django.http import response
import json
import oracledb

#################################### THINGS TO COMPLETE ########################################
# Sending data back to front end                                                               #
# Querying Posting Page                                                                        #
# Adding users to account table (Verifying unique IDs Maybe additional available ID tables)    #
# Placing New Postings into Posting table                                                      #
# Editing Postings in posting table (reserved o no)                                            #
# Removing Postings from Posting table                                                         #
################################################################################################


#connect to database
connection = oracledb.connect(
    user="esteban.medero",
    password="a6K5TDvHuejguhGFgAGBhEKI",
    dsn="oracle.cise.ufl.edu:1521/orcl")

##### DEBUG verify connection DEBUG #####
print("Successfully connected to Oracle Database")

def index(request):

    #connect to database
    cursor = connection.cursor()

    #format JSON request as python dictionary
    dict_request = json.loads(request.body)

    ##### DEBUG see request type DEBUG #####
    print(dict_request["requestType"])

    #Check if server request is a log in request
    if dict_request["requestType"] == "login":

        #perform query based on passed in indetifiers
        query = "SELECT * FROM accounts WHERE (email = \'" + dict_request["email"] + "\') AND (pw = \'" + dict_request["password"] + "\')"
        cursor.execute(query)

        ##### DEBUG see query DEBUG #####
        print(query)

        #format returned database values into python list
        res = cursor.fetchall()

        ##### DEBUG see contents of database request DEBUG #####
        print(res)
        
        # if nothing is returned credentials are invalid
        if len(res) == 0:
            print("Somethings wrong here. Invalid Email or Password.")
            #send invalid request back to front-end !!!!!TO DO!!!!!!!
            return HttpResponse("failed attempt")
        # dictionary names
        dictionaryNames = ['LastName', 'FirstName', 'UserName', 'Email', 'Phone', 'DOB', 'Password', 'i1', 'i2', 'i3']

        returnRequest = {}
        # convert returned list into python dictionary
        for entities in res:
            for i in range(len(entities)):
                returnRequest[dictionaryNames[i]] = entities[i]

        # convert python dictionary into json response and send back
        response = JsonResponse(returnRequest)
        print(response.content)
        # send data back to front end
        return response
    