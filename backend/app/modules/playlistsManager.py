import sys
import playlists

playlist_table = {}

def fetch_playlist_module(playlist_name):
	try:
		return playlist_table[playlist_name]
	except KeyError: 
		return [{"id":"-1", "url":"nada"}]

def load_playlist_modules():
	for playlist_module_name in playlists.__all__:
		module = sys.modules['playlists.'+playlist_module_name]
		playlist_table[module.name] = module