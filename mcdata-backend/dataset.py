import openpyxl
import re
from flask import redirect, request
from . import db
from .validate import ValidateDataset
import pymongo

class Dataset:
    def __init__(self, id, data, name, user, price, size, date_upload, downloads):
        self.id = id
        self.data = data
        self.name = name
        self.user = user
        self.price = price
        self.size = size
        self.date_upload = date_upload
        self.downloads = downloads

    def getDataset(collection_name="testing"):
        """
        Gets collection with matching pk=collection_name
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

            # check allowed file extensions and upload Dataset
            if f and ValidateDataset.allowed_file_extensions(f.filename):
                upload_status = Dataset.uploadDatasetMongo(f, f.filename)
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

    def uploadDatasetMongo(data, filename):
        try:
            # Get file type with extension
            extension = filename.rsplit('.', 1)[1].lower()
            filename_without_extension = str(re.sub(r"\.[^\.]+$", "", filename))

            if extension == 'txt':
                # Create a MongoDB collection
                collection = db.get_db()[filename_without_extension]

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
                
                print("Uploaded: " + filename)

                return "Dataset uploaded to mcdata marketplace"

            elif extension == 'xlsx':

                # Load the XLSX file.
                wb = openpyxl.load_workbook(data)
                ws = wb.active

                header_row = [str(cell.value) for cell in ws[1]]
                collection = db.get_db()[filename_without_extension]

                # Convert the generator object to a list.
                rows = list(ws.rows)

                # Create a MongoDB document from the row data.
                for row in rows[1:]:
                    columns = [str(cell.value) for cell in row] #TODO: all data typecasted to string, we want any type
                    document = {}

                    for i in range(len(header_row)):
                        document[header_row[i]] = columns[i]

                    collection.insert_one(document)
                
                print("Uploaded: " + filename)

                return "Dataset uploaded to mcdata marketplace"

        except:
            return "Couldn't upload dataset"
                

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
    
# print(Dataset.getTopDatasets())