import { ProjectModel } from "../../models/Project.js";

const top3Proj = async (req, res) => {
    try{
        const projects = await ProjectModel.find({}).select({heroImage : 1, order: 1, heading: 1, subHeading: 1}).sort({ order: 1 }).limit(3).populate('heroImage'); 

        if(projects.length > 0){
            return res.status(200).json({projects});
        }
        return res.status(404).json({message : "No Projects Found"});
    }
    catch(err){
        return res.status(500).json({message : err.message});
    } 
};

export default top3Proj;