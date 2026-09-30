"""Preview local: proxy de growtherup.agency con growtherup.css/js inyectados."""
import urllib.request, os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
SITE='https://growtherup.agency'; HERE=os.path.dirname(os.path.abspath(__file__))
INJECT=b'<link rel="stylesheet" href="/__local/growtherup.css"><script src="/__local/growtherup.js" defer></script></head>'
class H(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/__local/'):
            f=os.path.join(HERE,self.path[9:].split('?')[0])
            if os.path.isfile(f):
                self.send_response(200)
                self.send_header('Content-Type',{'css':'text/css','js':'application/javascript','webp':'image/webp'}.get(f.rsplit('.',1)[-1],'application/octet-stream'))
                self.send_header('Cache-Control','no-store'); self.end_headers()
                return self.wfile.write(open(f,'rb').read())
            self.send_response(404); return self.end_headers()
        req=urllib.request.Request(SITE+self.path,headers={'User-Agent':'Mozilla/5.0','Accept-Encoding':'identity'})
        try: r=urllib.request.urlopen(req)
        except urllib.error.HTTPError as e: r=e
        body=r.read(); ct=r.headers.get('Content-Type','')
        if 'text/html' in ct: body=body.replace(b'</head>',INJECT,1)
        self.send_response(r.status); self.send_header('Content-Type',ct)
        self.send_header('Content-Length',str(len(body))); self.end_headers(); self.wfile.write(body)
    def log_message(self,*a): pass
ThreadingHTTPServer(('127.0.0.1',8765),H).serve_forever()
