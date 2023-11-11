def allowed_file_extensions(filename):
        allowed_extensions = {'txt', 'pdf', 'xlsx'}
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions