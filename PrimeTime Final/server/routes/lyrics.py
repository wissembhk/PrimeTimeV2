from urllib.request import urlopen
import re
import sys



search_keyword=sys.argv[1]
search_keyword =search_keyword.replace(" ", "")
html = urlopen("https://www.youtube.com/results?search_query=" + search_keyword)
video_ids = re.findall(r"watch\?v=(\S{11})", html.read().decode())

video_url="https://www.youtube.com/embed/" + video_ids[0]
print(video_url)