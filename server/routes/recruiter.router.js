const router = require('express').Router();
const pool = require('../modules/pool');

// Get all recruiters
router.get('/', (req, res) => {
  const query = `
    SELECT *
    FROM "recruiters"
  `;
  pool.query(query)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(error);
      console.log(error);
    })
})

// Get specific recruiter
router.get('/:id', (req, res) => {
  const query = `
    SELECT *
    FROM "recruiters"
    WHERE "id" = $1;
  `;
  pool.query(query, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

// Get info of applications respective recruiter for details page
router.get('/application/:id', (req, res) => {
  let query = `
    SELECT "recruiters".* 
    FROM "applications"
    LEFT JOIN "recruiters"
    ON "recruiters"."id" = "applications"."recruiter_id"
    WHERE "applications"."id" = $1;
  `;
  pool.query(query, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
     console.log('error in GET /application/recruiter/:id', error);
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  const recruiter = req.body;
  const query = `
    INSERT INTO "recruiters" ("name", "company", "phone", "email")
    VALUES ($1, $2, $3, $4);
  `;
  pool.query(query, [recruiter.name, recruiter.company, recruiter.phone, recruiter.email])
    .then(() => {
      res.sendStatus(202);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

router.put('/:id', (req, res) => {
  const update = req.body;
  const query = `
    UPDATE "recruiters"
    SET "name" = $1,
        "company" = $2,
        "phone" = $3,
        "email" = $4
    WHERE "id" = $5;
  `;
  pool.query(query, [update.name, update.company, update.phone, update.email, req.params.id])
    .then(() => {
      res.sendStatus(202);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

module.exports = router;