const Template = require('../models/Template');

// Obtener todas las plantillas
exports.getTemplates = async (req, res) => {
    try {
        const templates = await Template.find();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las plantillas' });
    }
};

// Crear una nueva plantilla
exports.createTemplate = async (req, res) => {
    const { type, content, labels, author } = req.body;

    if (!type || !content || !author) {
        return res.status(400).json({ error: 'Los campos type, content y author son obligatorios' });
    }

    try {
        const template = new Template({ type, content, labels, author });
        const savedTemplate = await template.save();
        res.status(201).json(savedTemplate);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la plantilla' });
    }
};

// Actualizar una plantilla por ID
exports.updateTemplate = async (req, res) => {
    const { id } = req.params;
    const { type, content, labels, author } = req.body;

    if (!type || !content || !author) {
        return res.status(400).json({ error: 'Los campos type, content y author son obligatorios' });
    }

    try {
        const updatedTemplate = await Template.findByIdAndUpdate(
            id,
            { type, content, labels, author },
            { new: true, runValidators: true }
        );

        if (!updatedTemplate) {
            return res.status(404).json({ error: 'Plantilla no encontrada' });
        }

        res.status(200).json(updatedTemplate);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la plantilla' });
    }
};

// Eliminar una plantilla por ID
exports.deleteTemplate = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTemplate = await Template.findByIdAndDelete(id);

        if (!deletedTemplate) {
            return res.status(404).json({ error: 'Plantilla no encontrada' });
        }

        res.status(200).json({ message: 'Plantilla eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la plantilla' });
    }
};