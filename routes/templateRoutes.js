const express = require('express');
const {
    getTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate
} = require('../controllers/templateController');

const router = express.Router();

// Rutas CRUD
router.get('/', getTemplates);
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

module.exports = router;    