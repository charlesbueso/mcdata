from flask import request, render_template


def searchPost():
    if request.method == 'POST':
        search_input = request.form.get("search_input")
    return render_template('searchresults.html', search_results=search_database(search_input))

def search_database(input):
    search_results = 'This yo mfin search results!!!\n your input:  ' + input
    #TODO: Add database search, later semantic/filtered search
    return search_results