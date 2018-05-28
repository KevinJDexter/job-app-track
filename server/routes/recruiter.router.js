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

// Get info of applications respective recruiter for details page
router.get('/:id', (req, res) => {
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

module.exports = router;