import { MediaModel } from "../../models/Media.js";
import { ProjectModel } from "../../models/Project.js";

const deleteProject = async (req, res) => {
    const { id } = req.params;
    try{
        const project = await ProjectModel.findById(id);
        
        if(project.heroImage){
            const deleteHero = await MediaModel.deleteOne({_id : project.heroImage});
        }
        await Promise.all(project.media.map(async (med) => {
            const deleteMed = await MediaModel.deleteOne({_id : med});
        }));

        const deleteProject = await ProjectModel.deleteOne({_id: id});
        
        if(deleteProject.deletedCount === 1){
            return res.status(200).json({message : "Project Deleted Succesfully"});
        }
        return res.status(404).json({message : "Project Not Found"});
    }
    catch(err){
        return res.status(500).json({"message": err.message});
    }
};

export default deleteProject;