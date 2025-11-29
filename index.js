import express from "express";
import router from "./routes_section/routes.js"; // list dari route(jalur url) untuk API

const app = express();
const PORT = 3001;

app.use(express.json());
//agar data json yang dikirim dapat diproses menjadi object javascript

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Manajemen Lukisan Dimulai");
})

app.use(router);
