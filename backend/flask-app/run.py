from flask import Flask, render_template, jsonify, request, session, url_for,redirect, flash, send_from_directory
import ast
import modules.playlistsManager as playlists_manager
import modules.handleyt as yt_handler

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('static/dist', 'index.html')

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
    return jsonify({"results":videoId})

if __name__ == '__main__':
    playlists_manager.load_playlist_modules()
    app.run(host= '192.168.1.151')
    # app.run(host= '0.0.0.0')