const authChecker = require('../../util/authChecker')
const recruiterChecker = require('../../util/recruiterChecker')
const Job = require('./jobModel')

const router = require('express').Router()
// get all jobs 
router.get('/', async (req, res) => {
    try {
        const data = await Job.find({})
        res.send(data)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
// get a job 

router.get('/:id', async (req, res) => {
    try {
        const data = await Job.findById(req.params.id)
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