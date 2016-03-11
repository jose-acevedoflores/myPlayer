import os
import signal
import atexit
import subprocess
import time
from optparse import OptionParser


# & http-server ../backend/flask-app/static -p 8081

def kill_child(child):
    if child is None:
        pass
    else:
        os.kill(child.pid, signal.SIGTERM)

def build():
    npm_webpack = subprocess.Popen(["npm", 'run', 'buildc'], cwd=os.path.abspath("../reactapp"))


def start():

    server_app_path = os.path.abspath('../backend/flask-app/run.py')
    server = subprocess.Popen(["python", server_app_path, "192.168.1.152", "5050", "8081"])
    atexit.register(kill_child, server)

    static_content_path = os.path.abspath('../backend/flask-app/static')
    front_end = subprocess.Popen(["http-server", static_content_path, "-p", "8081"])
    atexit.register(kill_child, front_end)
        
    try:
        (output, error) = server.communicate()
    except KeyboardInterrupt:
        print 'Parent process stopped, stopping childs'

if __name__ == '__main__':
    parser = OptionParser()
    parser.add_option("-s", "--start", action="store_true",
                      help="Compile UI and start server")
    parser.add_option("-b", "--build", action="store_true",
                      help="Build website content")

    (options, args) = parser.parse_args()

    if options.start:
        start()
    if options.build:
        build()

