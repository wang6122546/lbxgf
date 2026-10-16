"""Run the local prototype with a backlog large enough for ES module imports."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys

class PreviewServer(ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True
    allow_reuse_address = True

class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8767
    handler = partial(PreviewHandler, directory=str(Path(__file__).resolve().parent))
    print(f'Preview: http://localhost:{port}/pages/companies.html', flush=True)
    PreviewServer(('127.0.0.1', port), handler).serve_forever()
