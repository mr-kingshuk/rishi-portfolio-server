import mongoose from 'mongoose';
import { ProjectModel } from "../../models/Project.js";

const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({"err" : "Not Valid OrderId"})
        }

        // Check if project exists in the database
        const project = await ProjectModel.findById(id).populate('heroImage')
        .populate('media').populate('hyperlinks');

        // If project is found, return project data
        if (project) {
            return res.status(200).json(project);
        } else {
            // If project is not found, return error message
            return res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default getProject;