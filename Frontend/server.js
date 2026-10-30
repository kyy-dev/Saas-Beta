const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const rootDirectory = __dirname;
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"]
]);

const server = http.createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  if (request.url === "/favicon.ico") {
    response.writeHead(204);
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  const filePath = path.resolve(rootDirectory, `.${pathname === "/" ? "/index.html" : pathname}`);
  if (filePath !== rootDirectory && !filePath.startsWith(`${rootDirectory}${path.sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      const notFound = error.code === "ENOENT" || error.code === "ENOTDIR" || error.code === "EISDIR";
      const status = notFound ? 404 : 500;
      if (!notFound) console.error(`Unable to serve ${pathname}:`, error);
      response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(notFound ? "Not found" : "Internal server error");
      return;
    }

    response.writeHead(200, {
      "Content-Length": contents.length,
      "Content-Type": contentTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream",
      "X-Content-Type-Options": "nosniff"
    });
    response.end(request.method === "HEAD" ? undefined : contents);
  });
});

const port = Number(process.env.PORT) || 8000;
server.listen(port, "127.0.0.1", () => {
  console.log(`PixelShift running at http://127.0.0.1:${port}`);
});
