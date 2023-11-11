import openpyxl
import re
import os
import uuid
import traceback
import csv
import io
from flask import redirect, request
from . import db, validate
import pymongo


def getDataset(collection_name="testing"):
    """
    Gets collection with matching unique collection_name
    """

    collection = db.get_db[collection_name]
    return collection


def uploadPost():
    # check if the post request has file
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect('/')
        
        f = request.files['file'] 

        if f.filename == '':
            return redirect('/')

        # Upload Dataset to mongodb
        if f and validate.allowed_file_extensions(f.filename):
            upload_status = uploadDatasetMongo(f, f.filename)
            return upload_status
        
            # this returns: 
            # {data: 'Dataset uploaded to mcdata marketplace', 
            #  status: 200, 
            #  statusText: 'OK', 
            #  headers: AxiosHeaders, 
            #  config: {…},
            # …}
            
        else:
            return "Couldn't validate dataset"
                # this returns: 
            # {data: 'Couldn't validate dataset', 
            #  status: 200, 
            #  statusText: 'OK', 
            #  headers: AxiosHeaders, 
            #  config: {…},
            # …}


def uploadDatasetMongo(data, filename, username='cbueso'):
    try:
        # Get file type with extension
        extension = os.path.splitext(filename)[1].lower()
        
        # dataset_collection_name = normalizeDatasetNameForMongodb(filename)
        dataset_collection_name = normalizeDatasetNameForMongodb(filename)

        if extension == '.txt':
            # Create a MongoDB collection
            collection = db.get_db()[dataset_collection_name]

            # Open and decode the file stream
            stream = data.stream
            decoded_stream = stream.read().decode("utf-8")
            lines = decoded_stream.splitlines()
            header_row = lines[0].strip().split("\t")
            lines = lines[1:]

            # Create a MongoDB document from the row data.
            for line in lines:
                columns = line.strip().split("\t")
                document = {}

                for i in range(len(columns)):
                    document[header_row[i]] = columns[i]

                collection.insert_one(document)
            
            print("Uploaded: " + filename + "\n with normalized and unique name: " + dataset_collection_name)

            return "Dataset uploaded to mcdata marketplace"

        elif extension == '.xlsx':

            # Load the XLSX file.
            wb = openpyxl.load_workbook(data)
            ws = wb.active

            header_row = [str(cell.value) for cell in ws[1]]
            collection = db.get_db()[dataset_collection_name]

            # Convert the generator object to a list.
            rows = list(ws.rows)

            # Create a MongoDB document from the row data.
            for row in rows[1:]:
                columns = [str(cell.value) for cell in row] #TODO: all data typecasted to string, we want any type
                document = {}

                for i in range(len(header_row)):
                    document[header_row[i]] = columns[i]

                collection.insert_one(document)
            
            print("Uploaded: " + filename + "\n with normalized and unique name: " + dataset_collection_name)

            return "Dataset uploaded to mcdata marketplace"
        
        elif extension == '.csv':

            stream = io.StringIO(data.stream.read().decode("UTF8"), newline=None)
            reader = csv.reader(stream)

            # Get the header row
            header_row = next(reader)

            # Create a MongoDB collection
            collection = db.get_db()[dataset_collection_name]

            # Iterate over the rows in the CSV file
            for row in reader:
                # TODO: Normalize more, top_english_movies.csv first column is just an index col
                document = {}

                for i in range(len(header_row)):
                    document[header_row[i]] = row[i]

                collection.insert_one(document)

            print("Uploaded: " + filename + "\n with normalized and unique name: " + dataset_collection_name)

            return "Dataset uploaded to mcdata marketplace"
        
        # TODO: accept these:
        # elif extension == '.JSON ':
        # elif extension == '.SQL':
        # elif extension == '.parquet':
        # elif extension == '.orc':
        # elif extension == '.TFRecord':
        # audio
        # photo & video

    except:
        return "Couldn't upload dataset", traceback.print_exc()
    

def normalizeDatasetNameForMongodb(dataset_name):
    """Normalizes a dataset name to be used in the collection name in MongoDB.
        Takes in count most malicious injection attacks

    Args:
        dataset_name: The name of the dataset to normalize.
            e.g. mcdata.a_labelled_gallery_of_rare_medical_diseases.drop().xlsx

    Returns:
        A normalized and unique dataset name that is safe to use in a MongoDB.
            e.g. a_labelled_gallery_of_rare_medical_diseases_drop_6449d19d-914f-48df-8ca5-ada9813a57b2
    """

    # Remove extension.
    dataset_name = str(re.sub(r"\.[^\.]+$", "", dataset_name))

    # Remove prohibited words from final collection name.
    prohibited_words = ["mcdata", "db", "system", "local", "config", "admin", "user", "group", 
                        "role", "__proto__", "$cmd", "$geoNear", "$listDatabases", "$replSetGetStatus"]
    for word in prohibited_words:
        dataset_name = dataset_name.replace(word, "")

    # Remove malicious characters.
    dataset_name = re.sub(r"[^a-zA-Z0-9_\.]", "", dataset_name)

    # Replace dots with underscores.
    dataset_name = dataset_name.replace(".", "_")

    # Remove leading and trailing whitespace.
    dataset_name = dataset_name.strip()

    # Convert the dataset name to lowercase.
    dataset_name = dataset_name.lower()

    # Generate a UUID4.
    unique_id = str(uuid.uuid4())

    # Remove two or more consecutive underscores.
    while re.search(r"_{2,}", dataset_name):
        dataset_name = re.sub(r"_{2,}", "_", dataset_name)

    # Remove leading chars until letter or number.
    match = re.match(r"^(?:_)*", dataset_name)
    if match is not None:
        dataset_name = dataset_name[match.end():]

    # Create the normalized dataset name.
    normalized_dataset_name = f"{dataset_name}_{unique_id}"

    return normalized_dataset_name


def downloadDataset():
    """if user has bought
        fetch data from mongodb, give user download
    has_bought(dataset_id, user)
    has_bought = True
    if has_bought:
        """
    return


def getTopDatasets(number_of_datasets=5):
    """ideally will return following Json, dataset0 being the highest ranked:
    Response = {
        Dataset0: {
            _id: ‘’,
            Name: ‘’,
            Description: ‘’,
            Type: ‘’,
            Rows: ‘’, 
            Cols: ‘’,
            Size (GB): ‘’,
            LLMinsights: ‘’,
        }
        Dataset1: {…}
        Dataset2: {…}
        Dataset3: {…}
        Dataset4: {…}
    }

    for now, only one dataset 5 times:
    Response = {
        "_id": str(collection._id),
        "Name": collection.name,
        "Rows": num_rows,
        "Cols": num_cols,
        "Size (MB)": collection_size
    }
    """

    # Connect to the database.
    client = pymongo.MongoClient()
    db = client["mcdata-test"]

    # Get the collection.
    collection = db["testing"]

    # Get the number of documents in the collection.
    num_rows = collection.count_documents({})

    # Get the number of tags on the first document
    num_cols = 0
    for document in collection.find():
        num_cols += len(document.keys())
        break

    # Get the size of the collection in MB
    collection_size = db.command("collstats", "testing")["size"]


    # # Create a JSON object with the collection information.
    # collection_info = {
    #     "_id": str(collection._id),
    #     "Name": collection.name,
    #     "Rows": num_rows,
    #     "Cols": num_cols,
    #     "Size (GB)": collection_size
    # }

    # print(collection_info)

    return collection_size, num_cols, num_rows
    