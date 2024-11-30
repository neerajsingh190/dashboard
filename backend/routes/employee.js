const express = require('express');
const Employee = require('../models/Employee');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const router = express.Router();
const path = require('path');
// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // Ensure unique filenames
  },
});
const upload = multer({ storage });

router.post('/create', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;

    const emailExists = await Employee.findOne({ email });
    if (emailExists) return res.status(400).json({ message: 'Email already exists' });
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const employee = new Employee({
      image: imageUrl,
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  
  try {
    const { page = 1, search = '' } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;
    const searchCriteria = {
      $or: [
        { name: { $regex: search, $options: 'i' } }, // Case-insensitive search for name
        { email: { $regex: search, $options: 'i' } }, // Case-insensitive search for email
        { mobile: { $regex: search, $options: 'i' } }, // Case-insensitive search for mobile
      ],
    };
    const employees = await Employee.find(searchCriteria)
      .skip(skip)
      .limit(limit);
    // const employees = await Employee.find();
    const totalEmployees = await Employee.countDocuments(searchCriteria);
    // res.status(200).json(employees);
    res.status(200).json({
      employees,
      currentPage: Number(page),
      totalPages: Math.ceil(totalEmployees / limit),
      totalEmployees,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
});

router.put('/edit/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {

    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
});

module.exports = router;
