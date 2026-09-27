const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const rootDirectory = path.resolve(__dirname, "..");
const tasksFile = path.join(__dirname, "tasks.txt");
const port = Number(process.env.PORT) || 3000;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

async function readTasks() {
  const contents = await fs.readFile(tasksFile, "utf8");
  return contents.trim() ? JSON.parse(contents) : [];
}

async function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function readRequestBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_000_000) {
      throw new Error("Request body is too large.");
    }
  }
  return JSON.parse(body);
}

async function handleApi(request, response) {
  if (request.method === "GET" && request.url === "/api/tasks") {
    return sendJson(response, 200, await readTasks());
  }

  if (request.method === "POST" && request.url === "/api/tasks") {
    const submittedTask = await readRequestBody(request);
    if (
      typeof submittedTask.title !== "string" ||
      !submittedTask.title.trim() ||
      !Array.isArray(submittedTask.subtasks) ||
      !["low", "medium", "high"].includes(submittedTask.priority)
    ) {
      return sendJson(response, 400, { error: "Invalid task details." });
    }

    const tasks = await readTasks();
    const task = {
      id: randomUUID(),
      title: submittedTask.title.trim(),
      subtasks: submittedTask.subtasks.filter((subtask) => typeof subtask === "string"),
      deadline: typeof submittedTask.deadline === "string" ? submittedTask.deadline : "",
      priority: submittedTask.priority,
      context: typeof submittedTask.context === "string" ? submittedTask.context.trim() : "",
      createdAt: new Date().toISOString()
    };

    tasks.push(task);
    await fs.writeFile(tasksFile, `${JSON.stringify(tasks, null, 2)}\n`, "utf8");
    return sendJson(response, 201, task);
  }

  return sendJson(response, 404, { error: "Not found." });
}

async function serveFile(request, response, pathname) {
  const requestedPath = pathname === "/" ? "/dashboard.html" : decodeURIComponent(pathname);
  const filePath = path.resolve(rootDirectory, `.${requestedPath}`);

  if (
    !filePath.startsWith(`${rootDirectory}${path.sep}`) ||
    filePath.startsWith(`${path.join(rootDirectory, "backend")}${path.sep}`)
  ) {
    response.writeHead(403);
    return response.end("Forbidden");
  }

  try {
    const contents = await fs.readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream"
    });
    response.end(contents);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, "http://localhost").pathname;
    if (pathname.startsWith("/api/")) {
      await handleApi(request, response);
    } else if (request.method === "GET") {
      await serveFile(request, response, pathname);
    } else {
      sendJson(response, 405, { error: "Method not allowed." });
    }
  } catch (error) {
    const statusCode = error instanceof SyntaxError ? 400 : 500;
    if (!response.headersSent) {
      sendJson(response, statusCode, { error: error.message || "Server error." });
    } else {
      response.destroy();
    }
  }
});

server.listen(port, () => {
  console.log(`Todo app running at http://localhost:${port}`);
});