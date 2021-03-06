import cherrypy
import os
import ast
from optparse import OptionParser

# custom imports
import modules.playlistsManager as playlists_manager
import modules.handleyt as yt_handler

class Root:

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def get_playlists(self):
        playlists = map(lambda index, playlist_name: {"name":playlist_name, "id":index} , 
            range(len(playlists_manager.playlist_table.keys())), 
            playlists_manager.playlist_table.keys() 
            ) 
        return {'results':playlists}


    @cherrypy.expose
    @cherrypy.tools.json_out()
    def search(self, query):
        yt_search_results = yt_handler.search(query, maxResults=4)
        results = map(lambda index, yt_search_result: dict(id=index, url=yt_search_result['url'], name=yt_search_result['name'], thumbnail_url=yt_search_result['thumbnail_url']) , range(len(yt_search_results)), yt_search_results )
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


if __name__ == '__main__':
    
    conf = {
        '/': {
             'tools.staticdir.on': True,
             'tools.staticdir.dir': os.path.join(os.path.dirname(os.path.realpath(__file__)),'static', 'dist'),
             'tools.staticdir.index': 'index.html'
         },
      
         '/static': {
             'tools.staticdir.on': True,
             'tools.staticdir.dir': os.path.join(os.path.dirname(os.path.realpath(__file__)),'static')
         },
         '/audio': {
             'tools.staticdir.on': True,
             'tools.staticdir.dir': os.path.join(os.path.dirname(os.path.realpath(__file__)),'static','audio')
         }
     }


    parser = OptionParser()
    parser.add_option("-p", "--server_port",
                  action="store", type="string", dest="server_port", help="Port that the server will run from")
    parser.add_option("-i", "--server_ip",
                  action="store", type="string", dest="server_ip", help="Host IP")
    parser.add_option("--dev", action="store_true", help="Developer view. Accept all conections (host=0.0.0.0)")

    (options, args) = parser.parse_args()

    playlists_manager.load_playlist_modules()

    if options.server_port and options.server_ip:

        host_port = options.server_port
        audio_stream_port = options.server_port
        host = options.server_ip

        cherrypy.config.update({'server.socket_host': host , 'server.socket_port': int(host_port)})
        cherrypy.quickstart(Root(), '/', config=conf)
    elif options.dev: 
        print 'dev not configured'
    else:
        parser.print_help()







