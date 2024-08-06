from http.server import HTTPServer, BaseHTTPRequestHandler
from jinja2 import Environment, FileSystemLoader, TemplateNotFound
import os
import mimetypes
import logging

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'

        if self.path.endswith(".html"):
            self.serve_template()
        else:
            self.serve_static()

    def serve_template(self):
        try:
            env = Environment(loader=FileSystemLoader('.'))
            template = env.get_template(self.path[1:])
            message = "Hello, World!"
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(bytes(template.render(message=message), 'utf-8'))
        except TemplateNotFound:
            self.send_error(404, 'File Not Found')
        except Exception as e:
            logging.exception("Error processing request")
            self.send_error(500, 'Internal Server Error')

    def serve_static(self):
        try:
            file_path = self.path[1:]
            if os.path.isfile(file_path):
                self.send_response(200)
                mime_type, _ = mimetypes.guess_type(file_path)
                self.send_header('Content-type', mime_type if mime_type else 'application/octet-stream')
                self.end_headers()
                with open(file_path, 'rb') as file:
                    self.wfile.write(file.read())
                    print(mime_type)
            else:
                self.send_error(404, 'File Not Found')
        except Exception as e:
            logging.exception("Error serving static file")
            self.send_error(500, 'Internal Server Error')

httpd = HTTPServer(('', 5500), SimpleHTTPRequestHandler)
httpd.serve_forever()