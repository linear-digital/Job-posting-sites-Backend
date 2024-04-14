const authChecker = require('../../util/authChecker')
const recruiterChecker = require('../../util/recruiterChecker')
const Apply = require('./job.apply')
const Job = require('./jobModel')

const router = require('express').Router()
// get all jobs 
router.get('/', async (req, res) => {
    const query = req.query
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 50
    const skip = (page - 1) * pageSize
    // console.log(query, "query")
    try {
        const filters = {}
        if (query) {
            Object.keys(query).forEach((key) => {
                if (query[key] !== "") {
                    filters[key] = query[key];
                }
            });
        }
        // console.log(filters)
        const data = await Job.find({ ...filters })
            .populate("user", "name phone email location")
            .skip(skip)
            .limit(pageSize)
            .exec()
        res.send(data)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
// get a job 

router.get('/:id', async (req, res) => {
    try {
        const data = await Job.findById(req.params.id)
            .populate("user", "name phone email location")
            .exec()
        res.send(data)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// create a job post

router.post('/', recruiterChecker, async (req, res) => {
    const body = req.body

    try {
        const newJob = new Job(body)

        const result = await newJob.save()
        res.send({ result, message: "Job Created Success" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
// update a job post
router.put('/:id', recruiterChecker, async (req, res) => {
    const body = req.body
    try {
        const result = await Job.findByIdAndUpdate(req.params.id, body, { new: true })
        res.send({ result, message: "Job Updated Success" })
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
})
/// apply for a job
router.post('/apply', authChecker, async (req, res) => {
    const body = req.body
    try {
        const isApplyed = await Apply.findOne({ user: body.user, job: body.job })
        if (isApplyed) {
            return res.status(400).json({ message: "Already Applied" });
        }
        const newApply = new Apply(body)
        const result = await newApply.save()
        res.send({ result, message: "Job Applied Success" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// get applys count

router.get('/apply/:id', authChecker, async (req, res) => {
    
    try {
        const result = await Apply.find({ job: req.params.id })
        const count = result.length
        res.send({ count, result })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
// delete a job post
router.delete('/:id', recruiterChecker, async (req, res) => {
    try {
        const result = await Job.findByIdAndDelete(req.params.id)
        res.send({ result, message: "Job Deleted Success" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
module.exports = router