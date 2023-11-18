from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.http import JsonResponse
from django.http import response
from random import randrange
import json
import oracledb
import datetime

#################################### THINGS TO COMPLETE ########################################
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

    #format JSON request as python dictionary
    dict_request = json.loads(request.body)

    #connect to database
    cursor = connection.cursor()

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
        dictionaryNames = ['LastName', 'FirstName', 'Email', 'Phone', 'Password', 'status', 'street', 'city', 'state', 'zip', 'userid', 'org']

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
    
    ####################################
    ####### REGISTER USER LOGIC ########
    ####################################
    if dict_request["requestType"] == "register":

        #check if user email already exists
        cursor.execute("SELECT * FROM accounts WHERE (email = \'" + dict_request["email"] + "\')")
        res = cursor.fetchall()
        print(len(res))
        if len(res) > 0:
            HttpResponse("success")
        else:
            #generate random id and verify uniqueness
            new_user_id = randrange(10000000, 100000000)
            cursor.execute("SELECT * FROM unique_ids WHERE (IDS = " + str(new_user_id) + ")")
            print(new_user_id)
            while len(cursor.fetchall()) > 0:
                new_user_id = randrange(10000000, 100000000)
                cursor.execute("SELECT * FROM unique_ids WHERE (IDS = " + str(new_user_id) + ")")

            insertQuery = "INSERT INTO accounts (LASTNAME, FIRSTNAME, ORG, EMAIL, PHONE, PW, DONATIONSTATUS, USERID, ADDRESS, CITY, STATE, ZIPCODE) "
            insertQuery += "VALUES ("
            insertQuery += "\'" + dict_request["lastName"] + "\', "
            insertQuery += "\'" + dict_request["firstName"] + "\', "
            insertQuery += "\'" + dict_request["org"] + "\', "
            insertQuery += "\'" + dict_request["email"] + "\', "
            insertQuery += "\'" + dict_request["phone"] + "\', "
            insertQuery += "\'" + dict_request["password"] + "\', "
            if dict_request["donate"] == "True":
                insertQuery += "\'" + "1"+ "\', "
            else:
                insertQuery += "\'" + "0"+ "\', "
            insertQuery += str(new_user_id) + ", "
            insertQuery += "\'" + dict_request["streetAddress"] + "\', "
            insertQuery += "\'" + dict_request["city"] + "\', "
            insertQuery += "\'" + dict_request["state"] + "\', "
            insertQuery += "\'" + dict_request["zip"] + "\'"
            insertQuery += ")"

            ##### DEBUG LINE #####
            print(dict_request)
            print(insertQuery)

            cursor.execute(insertQuery)
            cursor.execute("COMMIT")

            cursor = connection.cursor()

            return HttpResponse("success")
    
    if dict_request["requestType"] == "postDonation":

        insertDonation = "INSERT INTO postings (donateeid, donatorid, fooditems, postdate, expiration, reserved, expired, pickedup) "
        insertDonation += "VALUES  ("
        insertDonation += "NULL, "
        insertDonation += "\'" + dict_request["donatorid"] + "\', "
        insertDonation += "\'" + dict_request["food"] + "\', "
        insertDonation += "\'" + str(datetime.date.today()) + "\', "
        insertDonation += "\'" + dict_request["date_expires"] + "\', "
        insertDonation += "" + str(0) + ", "
        insertDonation += "" + str(0) + ", "
        insertDonation += "" + str(0) + ")"

        return HttpResponse("success")

    