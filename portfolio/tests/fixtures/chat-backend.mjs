import http from 'node:http';
let lastRequest;
http.createServer(async (req, res) => {
  if (req.method === 'POST') {
    let body = ''; for await (const chunk of req) body += chunk;
    lastRequest = JSON.parse(body);
    res.writeHead(200, { 'Content-Type': 'text/event-stream' });
    res.end('data: 0:"Verified test response"\n\n');
  } else { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(lastRequest || {})); }
}).listen(8765, '127.0.0.1');
