const express = require("express");

const db = require("../data/dbconfig");

const router = express.Router();

// GET "/"
router.get("/", (req, res, next) => {
  db("cars")
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

// GET "/:id"
router.get("/:id", (req, res, next) => {
  db("cars")
    .where({ id: req.params.id })
    .first()
    .then(response => {
      if (response) {
        res.json(response);
      } else {
        res.status(404).json({ message: "Car does not exist" });
      }
    })
    .catch(err => {
      next(err);
    });
});

// POST "/"
router.post("/", (req, res, next) => {
  const car = req.body;
  if (!car.vin || !car.make || !car.model || !car.mileage) {
    return res
      .status(404)
      .json({ message: "Must include vin number, make, model, and mileage." });
  }

  db("cars")
    .insert(car)
    .then(response => {
      res.status(201).json({ message: `Car succesfully created!` });
    })
    .catch(err => {
      next(err);
    });
});

// PUT "/:id"
router.put("/:id", (req, res, next) => {
  db("cars")
    .where({ id: req.params.id })
    .update(req.body)
    .then(response => {
      res.json({
        message: `Car with id ${req.params.id} was updated`
      });
    })
    .catch(err => {
      next(err);
    });
});

// DELETE "/:id"
router.delete("/:id", (req, res, next) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(response => {
      res.json({
        message: `Car with id ${req.params.id} was deleted. `
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
