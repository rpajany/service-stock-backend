const express = require('express');
const router = express.Router();

const { load_QuoteTerms } = require('../controller/QuoteTerms_Controller');

router.get('/load', load_QuoteTerms);



module.exports = router;