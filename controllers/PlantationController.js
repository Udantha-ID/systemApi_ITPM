const Plantation = require('../models/PlantationModel');

const growthPeriods = {
  coconut: 120,
  mango: 12,
  rambutan: 24,
  pineapple: 12,
  tea: 9
};

// Create new plantation
const createPlantation = async (req, res) => {
  try {
    const { projectName, type, landArea, startDate, location, employees } = req.body;

    
    if (!projectName?.trim()) throw new Error('Project name is required');
    if (!Object.keys(growthPeriods).includes(type?.toLowerCase())) {
      throw new Error('Invalid plantation type');
    }
    if (isNaN(landArea)) throw new Error('Land area must be a number');
    if (isNaN(new Date(startDate))) throw new Error('Invalid start date format');
    if (isNaN(employees)) throw new Error('Employees must be a number');

    const harvestDate = new Date(startDate);
    harvestDate.setMonth(harvestDate.getMonth() + growthPeriods[type.toLowerCase()]);

    const plantation = await Plantation.create({
      projectName: projectName.trim(),
      type: type.toLowerCase(),
      landArea: parseFloat(landArea),
      startDate: new Date(startDate),
      harvestingDate: harvestDate,
      location: location.trim(),
      employees: parseInt(employees)
    });

    res.status(201).json(plantation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all plantations
const getPlantations = async (req, res) => {
  try {
    const plantations = await Plantation.find().sort({ createdAt: -1 });
    res.status(200).json(plantations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get one plantation
const getSinglePlantation = async (req, res) => {
  try {
    const plantation = await Plantation.findById(req.params.id);
    if (!plantation) {
      return res.status(404).json({ error: 'Plantation not found' });
    }
    res.status(200).json(plantation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update plantations
const updatePlantation = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, startDate, landArea, employees, ...rest } = req.body;

    // Validate inputs
    if (isNaN(landArea)) throw new Error('Invalid land area');
    if (isNaN(employees)) throw new Error('Invalid employee count');
    if (isNaN(new Date(startDate))) throw new Error('Invalid start date');

    
    const harvestDate = new Date(startDate);
    const growthPeriod = growthPeriods[type.toLowerCase()] || 0;
    harvestDate.setMonth(harvestDate.getMonth() + growthPeriod);

    const updatedData = {
      ...rest,
      type: type.toLowerCase(),
      landArea: parseFloat(landArea),
      employees: parseInt(employees),
      startDate: new Date(startDate),
      harvestingDate: harvestDate
    };

    const plantation = await Plantation.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );
    
    if (!plantation) {
      return res.status(404).json({ error: 'Plantation not found' });
    }
    
    res.status(200).json(plantation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete plantation
const deletePlantation = async (req, res) => {
  try {
    const { id } = req.params;
    await Plantation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Plantation deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Get completed plantations
const getCompletedPlantations = async (req, res) => {
  try {
    const plantations = await Plantation.find({ completed: true })
      .sort({ completedDate: -1 })
      .limit(5);
    res.json(plantations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPlantation,
  getPlantations,
  getSinglePlantation,
  updatePlantation,
  deletePlantation,
  completePlantation,
  getCompletedPlantations
};