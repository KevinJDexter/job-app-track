const router = require('express').Router();
const pool = require('../modules/pool');

// Get contacts associated with an application
router.get('/:id', (req, res) => {
  let query = `
    SELECT "contacts".*
    FROM "contacts"
    JOIN "applications"
    ON "contacts"."application_id" = "applications"."id"
    WHERE "applications"."id" = $1;
  `;
  pool.query(query, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('Error in GET /application/contacts/:id', error);
      res.sendStatus(500);
    })
})

// Adds new contact into the database
router.post('/', (req, res) => {
  const contact = req.body;
  const query = `
    INSERT INTO "contacts" ("name", "company", "job", "phone", "email", "relation", "notes", "isPrimary", "application_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
  `;
  pool.query(query, [contact.name, contact.company, contact.job, contact.phone, contact.email, contact.relation, contact.notes, contact.isPrimary, contact.application_id])
    .then(() => {
      res.sendStatus(202);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

// Updates the contact in the database
router.put("/:id", (req, res) => {
  const update = req.body;
  const query = `
    UPDATE "contacts"
    SET "name" = $1,
        "company" = $2,
        "phone" = $3,
        "email" = $4,
        "job" = $5,
        "relation" = $6,
        "notes" = $7
    WHERE "id" = $8
  `;
  pool.query(query, [update.name, update.company, update.phone, update.email, update.job, update.relation, update.notes, req.params.id])
    .then(() => {
      res.sendStatus(202);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

module.exports = router;