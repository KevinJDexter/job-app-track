const router = require('express').Router();
const pool = require('../modules/pool');


// Collects all current applications
router.get('/all', (req, res) => {
  let query = `SELECT * FROM "applications";`
  pool.query(query)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('error in GET /application/all', error);
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

///// Update query to update ALL fields (commented out since, as of now, should not be an option.)
/*
router.put('/:id', (req, res) => {
  const update = req.body;
  let query = `
    UPDATE "applications"
    SET "company" = $1,
        "jobId" = $2,
        "jobTitle" = $3,
        "jobDescription = $4,
        "date" = $5,
        "followedUp" = $6,
        "followUpDate" = $7,
        "resume" = $8, 
        "coverLetter" = $9,
        "notes" = $10,
        "companyUrl" = $11,
        "recruiter_id" = $12
    WHERE "id" = $13;
  `;
  pool.query(query, [update.company, update.jobId, update.jobTitle, update.jobDescription, update.date, update.followedUp, update.followUpDate, update.resume, update.coverLetter, update.notes, update.companyUrl, update.recruiterId, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in PUT /application/:id', error);
      res.sendStatus(500);
    })
}
*/

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

module.exports = router;