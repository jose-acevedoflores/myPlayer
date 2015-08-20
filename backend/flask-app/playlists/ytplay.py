import modules.handleyt as yt_handler

name="YouTube Playlist"

def fetch_results():
	"""
		Method called from the app.py to send the results to the client
		RETURNS:
			List of dictionaries.
	"""
	results = []
	index=0
	for query in source_parser():
		yt_search_result = yt_handler.search(query)
		results.append(dict(id=index, url=yt_search_result['url'], name=yt_search_result['name'], thumbnail_url=yt_search_result['thumbnail_url']) )
		index+=1
	return results

def source_parser():
	""" 
		Returns a list of strings to search in youtube.
	"""
	return [ "Seven Lions - Lose Myself (Audio) ft. Lynn Gunn", "Phantogram - Black Out Days", "Oliver Heldens Shaun Frank - Shades Of Grey", "chromeo jealous", "Major Lazer lean on","Mana La prision"]