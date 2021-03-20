# Challenge
We would like you to download a set of synthetic patient data and determine the drug-drug interactions for the drugs the patient has been prescribed. The instructions are below.

1.    Download the Synthea 1000 patient sample dataset at https://synthea.mitre.org/downloads

1.    There are several different download formats available to you. If you do not have Health IT experience, we recommend using the CSV format.

2.    The Medications are encoded with RxNorm codes, which you will use in step 2.

2.    Write a program that determines how many of the synthetic patients have drug-drug interactions (https://en.wikipedia.org/wiki/Drug_interaction)

1.    Use the National Library of Medicine (NLM) Drug Interaction RESTful API

2.    The API requires RxNorm codes (obtained from step 1).

3.    The presence of an attribute called "fullInteractionTypeGroup" indicates a drug to drug interaction for the patient

3.    Display the results on the command line, HTML, or other.

Based on your resume, our preference would be for you to write the program either in JavaScript or in Python. You may use additional libraries to support your solution as long as those libraries are in common use.

If you have any questions regarding the task or feel that the task is unclear, please make any necessary assumptions to complete the task and record those assumptions in your write-up.

# Approach
   
   I dowloaded the dataset as a CSV file and saved the medications.csv file in my current directory. In order to use the file for my program, I took advantage of the Papa parser JS module. I first created a form (html file) that prompt the user to upload the file. Once the file is submitted, the records of the file is parsed with papa parser.

   Next, I iterated through each record and created a patient object that save each patient ID with the all the RX code of the med they are taking ex: {id: 'adfre', medCode; [1232, 3443]}. I then saved all the patients in an array called patients.

   Finally, I created a function that will iterate through the patients array and for each patient, I call the NLM api `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=207106+152923+656659`, passing the patient medCode as the query to check if there's any drug interaction between the med. The function return true if the result from the api request has the `fullInteractionTypeGroup` property and false otherwise. I then counted the number of time that function returned true, and printed that number in the console.

#  Stack used

The program was built with vanilla JavaScript and HTML;

1. To interact with the program, open the HTML file in the browser
2. upload the csv file then submit the file
3. once submitted, the number of patient with drug interactions will be printed in the console.