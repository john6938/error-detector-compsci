import os
import re

from flask import Flask, render_template, send_from_directory, request, jsonify

from error_feedback import emoticons, error_dict

app = Flask(__name__)
app.config.from_object(__name__)
app.config['SECRET_KEY'] = '3110a6a942bdc603ee5b373e1676d76d'


def get_text_errors(text):
    errors_found_dict = {}
    for error_class_name, error_class in error_dict.items():
        errors_found_dict[error_class_name] = {}
        for error_subclass_name, error_subclass in error_class.items():
            errors_found_dict[error_class_name][error_subclass_name] = []
            if 'errors' in error_subclass:
                for error in error_subclass['errors']:
                    if 'regex' not in error or not error['regex']:
                        continue
                    mistakes = [(m.start(), m.end()) for m in re.finditer(error['regex'], text)]
                    video = error['video'] if 'video' in error else error_subclass['video']
                    if mistakes:
                        errors_found_dict[error_class_name][error_subclass_name].append(
                            {
                                'spans': mistakes,
                                'help': error['help'],
                                'video': video,
                            }
                        )
    return errors_found_dict


@app.route("/")
@app.route("/home", methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        txt = request.json
        print(txt)
        text_errors_dict = get_text_errors(txt)
        print(text_errors_dict)
        print("\n")
        return jsonify(text_errors_dict)
    else:
        return render_template('index.html')


@app.route("/introduction")
def intro():
    return render_template('intro.html', error_dict=error_dict, emoticons=emoticons)


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon'
    )
