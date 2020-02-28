exports.seed = function(knex) {
  return knex("cars")
    .truncate()
    .then(function() {
      return knex("cars").insert([
        {
          vin: "DS9A9K4DJD930",
          make: "Toyota",
          model: "Camry",
          mileage: 184323,
          transmission: "automatic",
          title: "clear"
        },
        {
          vin: "MV532K4KL78KD",
          make: "Honda",
          model: "Accord",
          mileage: 221890,
          transmission: "manual",
          title: "clear"
        }
      ]);
    });
};
