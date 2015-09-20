from flask import Flask, render_template, jsonify, request, session, url_for,redirect, flash, send_from_directory
import ast
import modules.playlistsManager as playlists_manager
import modules.handleyt as yt_handler
import sys, os

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

    playlists_manager.load_playlist_modules()

    if sys.argv[1] != 'dev':
        host = sys.argv[1] 
        host_port = sys.argv[2]
        audio_stream_port=sys.argv[3]
        app.run(host=host, port=int(host_port))
    else:
        app.run(host= '0.0.0.0')


