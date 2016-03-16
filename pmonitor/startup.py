import os
import signal
import atexit
import subprocess
import time
from optparse import OptionParser


# & http-server ../backend/app/static -p 8081

def kill_child(child):
    if child is None:
        pass
    else:
        os.kill(child.pid, signal.SIGTERM)

def start_cherrypy():
    server_app_path = os.path.abspath('../backend/app/cherry_server.py') 
    server = subprocess.Popen(["python", server_app_path, "-i", "192.168.1.152", "-p", "8080"], cwd=os.path.abspath('../backend/app'))
    atexit.register(kill_child, server)

    try:
        (output, error) = server.communicate()
    except KeyboardInterrupt:
        print 'Parent process stopped, stopping childs'

def watchify():
    npm_watchify = subprocess.Popen(["npm", 'run', 'start'], cwd=os.path.abspath("../reactappv2"))


if __name__ == '__main__':
    parser = OptionParser()
    parser.add_option("-n", "--new", action="store_true",
                      help="Use Cherry PI and watchify")
    parser.add_option("-w", "--watchify", action="store_true",
                      help="Use Cherry PI and watchify")
    parser.add_option("--clean", action="store_true",
                      help="Delete static/audio folder")
    (options, args) = parser.parse_args()

    if options.new:
        start_cherrypy()
    elif options.watchify:
        watchify()
    elif options.clean:
        audio_path = os.path.abspath('../backend/app/static/audio')
        for root,_,files in os.walk(audio_path):
            if len(files) == 0:
                print audio_path+' -- Directory is clean'
            for _file in files:
                os.remove(os.path.join(root,_file))
    else:
        parser.print_help()

