import modules.handleyt as yt_handler
import requests
import  HTMLParser
try:
    # try and import the real config file with the private keys for the twitter api
    import instance.config as config
except ImportError:
    # import the general one otherwise
    print "instance/config.py was not found. BPM module won't be able to get twitter feed"
    import config


name="BPM"
url = "https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&screen_name=bpm_playlist"
headers=config.twitter_api_key
html = HTMLParser.HTMLParser()

def fetch_results():
    """
        Method called from the app.py to send the results to the client
        RETURNS:
            List of dictionaries.
    """
    results = []
    index=0
    for query in source_parser():
        yt_search_result = yt_handler.search(query, maxResults=1)
        if len(yt_search_result) > 0 and yt_search_result[0] is not None:
            yt_search_result = yt_search_result[0]
            results.append(dict(id=index,url=yt_search_result['url'], name=yt_search_result['name'], thumbnail_url=yt_search_result['thumbnail_url'] ) )
            index+=1
    return results
    
def source_parser():
    """ 
        Returns a list of strings to search in youtube.
    """
    feed = _get_twitter_feed()
    return feed

def _get_twitter_feed():
    """ Queries the twitter feed for the last 10 posts """
    resp = requests.get(url, headers=headers)
    return map(lambda element: _parse_tweet(element), resp.json())

def _parse_tweet(tweet):
    """ Given a tweet (single item from the twitter rest api GET query) get the name of the song if it's a valid tweet 
        NOTE: some tweets might not conform.  """
    parsed_tweet = html.unescape(tweet['text']).split("playing on")[0]
    return parsed_tweet
    

