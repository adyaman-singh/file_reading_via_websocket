# 📡 Live File Streamer with WebSocket and React

A fullstack project demonstrating the **power of WebSockets** by enabling **real-time file streaming** from a Node.js server to a React frontend. As the file updates, new content is streamed to the client. Users can control the stream with **Play** and **Pause** buttons.

This project is ideal for developers who want to learn:

* How WebSockets work in a fullstack environment
* How to use `fs.createReadStream` in Node.js
* How to stream file data in chunks
* How to control streaming with frontend input
* How to use Socket.IO with React and Node

---

## 🔧 Features

* 🔁 **Real-Time Streaming**: Read a file line-by-line or in chunks as it updates
* ⏯️ **Play/Pause Control**: React client can start or stop the live stream
* 💬 **WebSocket Communication**: Live duplex connection using `socket.io`
* ⚙️ **Modular Backend**: Clean Node.js server handling file I/O
* 🎨 **Modern UI**: React + Material UI for simple, intuitive controls

---

## 📁 Project Structure

```
/server          → Node.js + Socket.IO backend
/client          → React frontend with Material UI
```

---

## ⚙️ Tech Stack

### Backend

* **Node.js**
* **Socket.IO**
* **fs.createReadStream**

### Frontend

* **React**
* **Socket.IO Client**
* **Material UI (MUI)**

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js (v16 or newer)
* npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/adyaman-singh/file_reading_via_websocket.git
```

---

### 2. Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

---

### 3. Start the App

In **two terminals**:

#### Terminal 1 - Start Server

```bash
cd server
node index.js
```

#### Terminal 2 - Start Client

```bash
cd client
npm start
```

The client should open at [http://localhost:3000](http://localhost:3000)

---

## 🧠 How It Works

### 📡 WebSocket Communication

* When the client clicks **Play**, it emits a `start-stream` event to the server.
* The server starts reading the file using `fs.createReadStream`.
* Chunks of data are sent to the client via `socket.emit('file-chunk', data)`.
* When the client clicks **Pause**, it sends a `pause-stream` event, and the server stops the stream.

## 🧪 Example Use Case

You can test with any log file or text file that updates over time. For example, stream updates from a file like:

```bash
tail -f /var/log/system.log >> ./sample.txt
```

Then point your backend stream reader to `sample.txt`.

---

## 🧑‍💻 Author

Built with ❤️ by Adyaman Singh(https://github.com/adyaman-singh)

---

## 📃 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

