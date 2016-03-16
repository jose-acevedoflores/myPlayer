import requests
import youtube_dl
import os
try:
    # try and import the real config file with the private keys for the twitter api
    import instance.config as config
except ImportError:
    # import the general one otherwise
    print "instance/config.py was not found. handleyt module won't be able to get youtube responses"
    import config


yt_api_url = "https://www.googleapis.com/youtube/v3/search"
yt_api_key = config.youtube_api_key
api_parameter= "part=snippet&type=video&maxResults="


# ********** taken from http://willdrevo.com/downloading-youtube-and-soundcloud-audio-with-python-and-pandas/
savedir = os.path.realpath(__file__) + "/../../static/audio"
savedir = os.path.abspath(savedir)
if not os.path.exists(savedir):
    os.makedirs(savedir)

_options = {
    'format': 'bestaudio/best', # choice of quality
    'extractaudio' : True,      # only keep the audio
    'audioformat' : "mp3",      # convert to mp3 
    'outtmpl': '%(id)s',        # name the file the ID of the video
    'noplaylist' : True,        # only download single song, not playlist
}
# ****************
def search(query, maxResults=1):
    """ 
		Query youtube api 
		RETURNS: 
			Dictionary with the required attributes (defined in the get_results )
    """
    # api_parameter += maxResults
    query = query.replace('&','')
    query = query.replace(' ','+')
    url = yt_api_url+"?"+yt_api_key+"&"+api_parameter+str(maxResults)+"&q="+query
    resp = requests.get(url)

    # Iterate over the results (right now returns the first youtube hit)
    vids = map(lambda vid: {"name":vid['snippet']['title'], "url":vid['id']['videoId'], "thumbnail_url":vid['snippet']['thumbnails']['default']["url"]}, resp.json()['items'])
    return vids


def download_vid(videoId, full_url):
    # Download video and strip audio from vid 
    # Add video to cache
    # ********** taken from http://willdrevo.com/downloading-youtube-and-soundcloud-audio-with-python-and-pandas/
    with youtube_dl.YoutubeDL(_options) as ydl:

        savepath = os.path.join(savedir, "%s.mp3" % videoId)
        try: 
            os.stat(savepath)
            print "%s already downloaded, continuing..." % savepath
        except OSError:
            # Download video
            try:
                downloaded_file = ydl.extract_info(full_url, download=True)
                os.rename(downloaded_file['id'], savepath)
                print "Downloaded and converted %s successfully!" % savepath
            except Exception as e:
                print "Can't download audio! %s\n" % videoId
    # ****************
    