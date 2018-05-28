const router = require('express').Router();
const pool = require('../modules/pool');


// Collects all current applications
router.get('/all', (req, res) => {
  let query = `SELECT * FROM "applications";`;
  pool.query(query)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('error in GET /application/all', error);
      res.sendStatus(500);
    })
})

// Get info to populate onto View table
router.get('/view', (req, res) => {
  let query = `
    SELECT "a"."id", "a"."company", "a"."jobTitle", "a"."date", "a"."followUpDate", 
            "a"."followedUp", "a"."companyUrl", "r"."name" as "recruiterName",
             "c"."name" as "contactName", "c"."email" as "contactEmail"
    FROM "applications" as "a"
    JOIN "contacts" as "c"
    ON "c"."application_id" = "a"."id"
    JOIN "recruiters" as "r"
    ON "a"."recruiter_id" = "r"."id"
    WHERE "c"."isPrimary" = 'true';
  `;
  pool.query(query)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('error in GET /application/info', error);
      res.sendStatus(500);
    })
})

// Get all info about an application for details page
router.get('/details/:id', (req, res) => {
  let query = `
    SELECT *
    FROM "applications"
    WHERE "id" = $1;
  `;
  pool.query(query, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('error in GET /application/details/:id', error);
      res.sendStatus(500);
    })
})

// Get info of applications respective recruiter for details page
router.get('/recruiter/:id', (req, res) => {
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

// Get contacts associated with an application
router.get('/contacts/:id', (req, res) => {
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

// Adds new job to job board
router.post('/', (req, res) => {
  const newApplication = req.body.application;
  const recruiterId = req.body.recruiterId;
  let query = `
    INSERT INTO "applications"
    ("company", "jobId", "jobTitle", "jobDescription", "date", "followedUp", "followUpDate", "resume", "coverLetter", "notes", "companyUrl", "recruiter_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
  `;
  pool.query(query, [newApplication.company, newApplication.jobId, newApplication.jobTitle, newApplication.jobDescription, newApplication.date, newApplication.followedUp, newApplication.followUpDate, newApplication.resume, newApplication.coverLetter, newApplication.notes, newApplication.companyUrl, recruiterId])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in POST /application', error);
      res.sendStatus(500);
    })
})

router.post('/contacts', (req, res) => {
  const contact = req.body;
  const query = `
    INSERT INTO "contacts" ("name", "company", "job", "phone", "email", "relation", "notes", "isPrimary", "application_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, 'false', $8);
  `;
  pool.query(query, [contact.name, contact.company, contact.job, contact.phone, contact.email, contact.relation, contact.notes, contact.application_id])
    .then(() => {
      res.sendStatus(202);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

// Updates the notes field
router.put('/notes/:id', (req, res) => {
  let query = `
    UPDATE "applications"
    SET "notes" = $1
    WHERE "id" = $2;
  `;
  pool.query(query, [req.body.notes, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in PUT /application/notes/:id', error);
      res.sendStatus(500);
    })
})

// Updates the Follow-up status
router.put('/followUp/:id', (req, res) => {
  let query = `
    UPDATE "applications"
    SET "followedUp" = $1
    WHERE "id" = $2;
  `;
  pool.query(query, [req.body.followedUp, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in PUT /application/followUp/:id', error);
      res.sendStatus(500);
    })
})

// Updates the Follow-up date, resetting follow-up status to false
router.put('/followUpDate/:id', (req, res) => {
  let query = `
    UPDATE "applications"
    SET "followUpDate" = $1, 
        "followedUp" = 'false'
    WHERE "id" = $2;
  `;
  pool.query(query, [req.body.followUpDate, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in PUT /application/follwUpDate/:id', error);
      res.sendStatus(500);
    })
})

// Deletes selected entry from database
router.delete('/:id', (req, res) => {
  let query = `
    DELETE FROM "applications"
    WHERE "id" = $1;
  `;
  pool.query(query, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in DELETE /application/:id', error);
      res.sendStatus(500);
    })
})

// Update query to update ALL fields
router.put('/:id', (req, res) => {
  const update = req.body;
  let query = `
    UPDATE "applications"
    SET "company" = $1,
        "jobId" = $2,
        "jobTitle" = $3,
        "jobDescription" = $4,
        "date" = $5,
        "followedUp" = $6,
        "followUpDate" = $7,
        "resume" = $8, 
        "coverLetter" = $9,
        "notes" = $10,
        "companyUrl" = $11
    WHERE "id" = $12;
  `;
  pool.query(query, [update.company, update.jobId, update.jobTitle, update.jobDescription, update.date, update.followedUp, update.followUpDate, update.resume, update.coverLetter, update.notes, update.companyUrl, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in PUT /application/:id', error);
      res.sendStatus(500);
    })
})

router.put("/contacts/:id", (req, res) => {
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
