var express = require('express');
var router = express.Router();
var data = require('../data.json');


/* GET jobs */
router.get('/', function (req, res, next) {
    let jobs_list = []
    let page = req.query.page || 0;
    let job_resp = data.jobs;

    if (req.query.page || Object.keys(req.query).length === 0) {
      job_resp = job_resp.slice(0+20*page, 19+20*page)
    }
  
    for (let idx in job_resp) {
      jobs_list.push(job_resp[idx].title);
    }
  
    if(req.query.order === "desc") {
      jobs_list = jobs_list.sort((a, b) => a - b);
    } 
    else if (req.query.order === "asc") {
      jobs_list = jobs_list.sort((a, b) => b - a);
    }
    else if (req.query.city === "San Francisco") {
      jobs_list = jobs_list.filter((job) => job.city === "San Francisco");
    }
  
    res.send(jobs_list);
});

module.exports = router;
