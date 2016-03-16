import cherrypy
import os
import ast

# custom imports
import modules.playlistsManager as playlists_manager
import modules.handleyt as yt_handler

class Root:

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def get_playlists(self):

        playlists = []
        for index,playlist_name in enumerate(playlists_manager.playlist_table.keys()):
            playlists.append({"name":playlist_name, "id":index})

        return {'results':playlists}


    @cherrypy.expose
    @cherrypy.tools.json_out()
    def search(self, query):
        results=[]
        yt_search_result = yt_handler.search(query)
        results.append(dict(id=0, url=yt_search_result['url'], name=yt_search_result['name'], thumbnail_url=yt_search_result['thumbnail_url']) )
        return {'results': results}

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def audio_stream(self, videoId):
        yt_handler.download_vid(videoId, "https://www.youtube.com/watch?v="+videoId)
        return {"results":videoId, "hostIp":host, "audioStreamPort":audio_stream_port}

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def get_playlist_data(self, playlist):
        results_dictionary = ast.literal_eval(playlist)
        return {"results": playlists_manager.fetch_playlist_module(results_dictionary['name']).fetch_results() }


host = '192.168.1.152'
audio_stream_port = '8080'
if __name__ == '__main__':
    playlists_manager.load_playlist_modules()
    
    conf = {
        '/': {
             'tools.staticdir.on': True,
             'tools.staticdir.dir': os.path.join(os.path.abspath(os.getcwd()),'static', 'dist'),
             'tools.staticdir.index': 'index.html'
         },
      
         '/static': {
             'tools.staticdir.on': True,
             'tools.staticdir.dir': os.path.join(os.path.abspath(os.getcwd()),'static')
         },
         '/audio': {
             'tools.staticdir.on': True,
             'tools.staticdir.dir': os.path.join(os.path.abspath(os.getcwd()),'static','audio')
         }
     }
    cherrypy.config.update({'server.socket_host': host })
    cherrypy.quickstart(Root(), '/', config=conf)
