const express = require('express');
const router = express.Router();

const Exoplanet = require('../models/Exoplanet.js');
let listErrors = [];


/* GET exoplanets index. */
router.get('/', (req, res, next) => {
  res.render('exoplanets/index', { exoplanetsTable: Exoplanet.list() });
});

/* POST add exoplanet. */
router.post('/add', (req, res, next) => {
  console.log("POST ADD EXOPLANET");
  Exoplanet.save({
    uniqueName: req.body.uniqueNameExoplanet,
    hClass: req.body.hClassExoplanet,
    discoveryYear: req.body.discoveryYearExoplanet
  });
  res.redirect('/exoplanets');
});

/* GET search exoplanet. */
router.get('/search', (req, res, next) => {
  let exoplanetsTable = null;
  let min3Char = false;
  console.log("GET SEARCH EXOPLANET");
  const uniqueNameExoplanetParam = req.query.uniqueNameExoplanet;
  if (uniqueNameExoplanetParam.length >= 3) {
    min3Char = true;
    exoplanetsTable = Exoplanet.search(uniqueNameExoplanetParam);
  }
  res.render('exoplanets/index', { exoplanetsTable, min3Char });
});

router.post('/delete', (req, res, next) => {
  console.log("id Exoplanète à supprimer : " + req.body.id);
  Exoplanet.delete(req.body.id);
  res.redirect('/exoplanets');
});


router.post('/update/index', (req, res, next) => {
  console.log("id exoplanet : " + req.body.id);
  results = Exoplanet.find(req.body.id);
  res.render('exoplanets/indexUpdate', { exoplanet: results });
});

router.post('/update', (req, res, next) => {
  console.log("POST UPDATE EXOPLANET");
  Exoplanet.save({
    id: req.body.id,
    uniqueName: req.body.uniqueNameExoplanet,
    hClass: req.body.hClassExoplanet,
    discoveryYear: req.body.discoveryYearExoplanet
  });
  res.redirect('/exoplanets');
});

// ============= Si vous devez ajouter du code, écrivez le ci-dessous =============

/* GET list */
router.get('/list', (req, res, next) => {
  console.log("GET LIST BY HCLASS");

  //const exoplanetId = req.query.exoplanet_id;
  const hClass = req.query.hClass;

  res.render('exoplanets/list', { exoplanetsTable: Exoplanet.listByHClass(hClass) });
});

/* GET select-hclass */
router.get('/select-hclass', (req, res, next) => {
  console.log("GET SELECT-HCLASS BY HCLASS");
  const hClass = req.query.hClass;

  res.render('exoplanets/selectHClass.hbs', { hClass });
});

/* POST select-hclass */
router.post('/select-hclass', (req, res, next) => {
  console.log("POST SELECT-HCLASS BY HCLASS");
  
  const hClass = req.body.hClass;
  console.log("Number of exoplanets in type '"+ hClass + "': " + Exoplanet.listByHClass(hClass).length);
  let isEmpty = false;
  
  //If no exoplanet with the selectionned type => error
  if (Exoplanet.listByHClass(hClass).length === 0) {
    isEmpty = true;
    listErrors.push("Il n'y a aucune exoplanète de hClass '" + hClass + "'.");
    res.render('exoplanets/selectHClass.hbs', { isEmpty, listErrors })
    listErrors = [];
  }
  //If exoplanet(s) with the selectionned type found => display list
  else {
    res.redirect('/exoplanets/list?hClass=' + hClass);
  }
  console.log("isEmpty: " + isEmpty);
});

/* POST delete all */
router.post('/delete-all', (req, res, next) => {
  console.log("POST DELETE ALL EXOPLANETS");
  Exoplanet.deleteAll();
  res.redirect('/exoplanets');
});

module.exports = router;