from flask import Flask, render_template, jsonify, request, session, url_for,redirect, flash, send_from_directory
import ast
import modules.playlistsManager as playlists_manager
import modules.handleyt as yt_handler
import sys, os
from optparse import OptionParser

app = Flask(__name__)
host='0.0.0.0'
host_port='5000'
audio_stream_port='8081'

@app.route('/')
def index():
    complete_path = os.path.realpath(__file__)+'/../static/dist'
    complete_path = os.path.abspath(complete_path)
    print complete_path
    return send_from_directory(complete_path, 'index.html')

@app.route('/get_playlists')
def get_playlists():
    playlists = []
    index = 1;
    for playlist_name in playlists_manager.playlist_table.keys():
        playlists.append({"name":playlist_name, "id":index})
        index+=1
    
    return jsonify({"results" : playlists})

@app.route('/get_playlist_data/<playlist>')
def get_playlist_data(playlist):
    results_dictionary = ast.literal_eval(playlist)
    return jsonify({"results": playlists_manager.fetch_playlist_module(results_dictionary['name']).fetch_results() })

@app.route('/search/<query>')
def search(query):
    print query
    results=[]
    yt_search_result = yt_handler.search(query)
    results.append(dict(id=0, url=yt_search_result['url'], name=yt_search_result['name'], thumbnail_url=yt_search_result['thumbnail_url']) )
    return jsonify({'results':results})

@app.route('/audio_stream/<videoId>')
def audio_stream(videoId):
    yt_handler.download_vid(videoId, "https://www.youtube.com/watch?v="+videoId)
    return jsonify({"results":videoId, "hostIp":host, "audioStreamPort":audio_stream_port})

if __name__ == '__main__':

    parser = OptionParser()
    parser.add_option("-p", "--server_port",
                  action="store", type="string", dest="server_port", help="Port that the server will run from")
    parser.add_option("-a", "--audio_stream_port",
                  action="store", type="string", dest="audio_stream_port", help="Port for the static audio server")
    parser.add_option("-i", "--server_ip",
                  action="store", type="string", dest="server_ip", help="Host IP")
    parser.add_option("--dev", action="store_true", help="Developer view. Accept all conections (host=0.0.0.0)")

    (options, args) = parser.parse_args()

    playlists_manager.load_playlist_modules()
    if options.server_port and options.audio_stream_port and options.server_ip:

        host_port = options.server_port
        audio_stream_port = options.audio_stream_port
        host = options.server_ip
        app.run(host=host, port=int(host_port))
    elif options.dev: 
        app.run(host= '0.0.0.0')
    else:
        parser.print_help()


