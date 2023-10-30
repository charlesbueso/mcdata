import json
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

    def uploadDataset(file):
        # Open the file as a binary stream.
        file_stream = file.stream.read()
        
        # Get connection and collection
        collection = db.get_db()['dataset']

        # Create a new document in the collection.
        document = {
            'filename': file.filename,
            'file_data': file_stream,
        }

        # Insert the document into the collection.
        collection.insert_one(document)

        # Close the database connection.
        db.close_db()
    
    def downloadDataset():
        return
    
    def displayDataset():
        return
    