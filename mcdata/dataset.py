import openpyxl
import re
from . import db

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

    def uploadDataset(data, filename):
        
        # Get file type with extension
        extension = filename.rsplit('.', 1)[1].lower()

        filename_without_extension = str(re.sub(r"\.[^\.]+$", "", filename))

        if extension == 'txt':

            f = open(data, "r")

            # Read the header row.
            header_row = f.read().readline().strip().split("\t")

            # Create a MongoDB collection if it doesn't already exist.
            collection = db.get_db()[filename_without_extension]

            # Iterate over the rows in the text file and insert them into the MongoDB collection.
            for row in f.read(): 
                # Split the row into columns.
                columns = row.strip().split("\t")

                # Create a MongoDB document from the row data.
                document = {}
                for i in range(len(header_row)):
                    document[header_row[i]] = columns[i]

                # Insert the document into the MongoDB collection.
                collection.insert_one(document)

        elif extension == 'xlsx':
            # Load the XLSX file.
            wb = openpyxl.load_workbook(data)

            # Get the active worksheet.
            ws = wb.active

            # Read the header row.
            header_row = [str(cell.value) for cell in ws[1]]

            # Create a MongoDB collection if it doesn't already exist.
            collection = db.get_db()[filename_without_extension]

            # Convert the generator object to a list.
            rows = list(ws.rows)

            # Iterate over the rows in the XLSX file and insert them into the MongoDB collection.
            for row in rows[1:]:
                # Split the row into columns.
                #TODO: all data typecasted to string, we want any type
                columns = [str(cell.value) for cell in row]

                # Create a MongoDB document from the row data.
                document = {}
                for i in range(len(header_row)):
                    document[header_row[i]] = columns[i]

                # Insert the document into the MongoDB collection.
                collection.insert_one(document)
                
    # def uploadDataset(file):
        # # Open the file as a binary stream.
        # file_stream = file.stream.read()
        
        # # Get connection and collection
        # collection = db.get_db()['dataset']

        # # Create a new document in the collection.
        # document = {
        #     'filename': file.filename,
        #     'file_data': file_stream,
        # }

        # # Insert the document into the collection.
        # collection.insert_one(document)

        # # Close the database connection.
        # db.close_db()

    def uploadDataset(data, filename, encoding="utf-8"):
        """Stores a data file in MongoDB with Pymongo.

        Args:
            data_file: A file object.
            mongodb_client: A pymongo MongoClient object.
            mongodb_database: The name of the MongoDB database to store the data in.
            mongodb_collection: The name of the MongoDB collection to store the data in.
        """

        # Read the header row.
        header_row = data.readline().strip().decode(encoding).split(",")

        # Create a MongoDB collection if it doesn't already exist.
        collection = db.get_db()[str(filename)]

        # Iterate over the rows in the data file and insert them into the MongoDB collection.
        for row in data:
            # Split the row into columns.
            columns = row.strip().decode(encoding)

            # Split the row into columns.
            columns = row.split(",")

            # Create a MongoDB document from the row data.
            document = {}
            for i in range(len(header_row)):
                document[header_row[i]] = columns[i]

            # Insert the document into the MongoDB collection.
            collection.insert_one(document)

    
    # def downloadDataset():
    #     #if user has bought
    #     #   fetch data from mongodb, give user download
    #     # has_bought(dataset_id, user)
    #     has_bought = True

    #     if has_bought:
    #     return
    
    def displayDataset():
        return
    