import openpyxl
import re
from flask import render_template, redirect, request
from . import db
from .validate import ValidateDataset

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
                Dataset.uploadDatasetMongo(f, f.filename)
                return render_template("datasetuploaded.html", name = f.filename)
            
            else:
                return redirect('/')

    def uploadDatasetMongo(data, filename):
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
                
    def downloadDataset():
    #     #if user has bought
    #     #   fetch data from mongodb, give user download
    #     # has_bought(dataset_id, user)
    #     has_bought = True
    #     if has_bought:
        return
    
    def displayDataset():
        return
    