import express from "express";
import logger from "morgan";
import dotenv from "dotenv";

dotenv.config();
(async () => {
  try {
    // Initialize express
    const app = express();
    const port = Number(process.env.PORT) || 8080;
    app.set("port", port);

    // Middleware
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    if (process.env.NODE_ENV !== "production") {
      app.use(logger("dev"));
      app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", `http://localhost:3000`);
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
      });
    }

    // Routes
    app.get("/api", async (req, res) => {
      try {
        return res.json(`Apma's server was here... 👽🛸`);
      } catch (err) {
        return res.status(500).json(err);
      }
    });

    // API Entry
    app.get("/", (req, res) => {
      res.status(200).send("Welcome to APMA Backend");
    });

    // Login
    app.post("/api/login", (req, res) => {
      console.log("req LOGIN BB", req.body);
      console.log("req LOGIN BB", req.params);
      const emailCheck = `SELECT * FROM ${req.body.type} WHERE email = '${req.body.email}'`;
      client.query(emailCheck, (err, emailRes) => {
        if (err) res.status(400).send(err);
        if (emailRes.rows.length == 0) {
          res
            .status(400)
            .send({ status: 400, message: "Email does not exist" });
        } else if (emailRes.rows[0].password !== req.body.password) {
          res.status(400).send({ status: 400, message: "Wrong password" });
        } else {
          res.status(200).send(emailRes.rows[0]);
        }
      });
    });

    // LANDOWNER ENDPOINTS
    app.post("/api/landowner", (req, res) => {
      const emailCheck = `SELECT * FROM LANDOWNER WHERE email = '${req.body.email}'`;
      client.query(emailCheck, (err, emailRes) => {
        if (err) res.status(400).send(err);
        if (emailRes.rows.length !== 0) {
          res
            .status(400)
            .send({ status: 400, message: "Email already in use" });
        } else {
          const insertQuery = `insert into LANDOWNER (first_name, last_name, email, password) values ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`;
          client.query(insertQuery, (err, queryRes) => {
            if (err) res.status(400).send(err);
            res.status(200).send({ status: 200, message: "Landowner added" });
          });
        }
      });
    });

    // Launch Server
    app.listen(port, () => {
      console.log(`📡 Server up! 📡 Listening on  http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
