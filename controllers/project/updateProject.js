import mongoose from 'mongoose';
import { MediaModel } from "../../models/Media.js";
import { ProjectModel } from "../../models/Project.js";
import { LinkModel } from '../../models/Link.js';

const updateProject = async (req, res) => {
    const { data, media, footer } = req.body;
    const { id } = req.params;

    let { heroImage, ...project } = data;
    let projectMedia = [];

    try {
        if (data.heroImage && !("_id" in data.heroImage)) {
            const heroMedia = await MediaModel.create(data.heroImage);
            project = { ...project, heroImage: heroMedia._id };
        }

        await Promise.all(media.map(async (med) => {
            const { _id, ...rest } = med;
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                const storedMed = await MediaModel.create(rest);
                projectMedia.push(storedMed._id);
            }
            else {
                projectMedia.push(_id);
            }
        }));

        project = { ...project, media: projectMedia };
        
        //footer
        let hyperlinks = [];
        await Promise.all(footer.hyperlinks.map(async (link) => {
            if('_id' in link && mongoose.Types.ObjectId.isValid(link._id)){
                hyperlinks.push(link._id);
            }
            else{
                const storedLink = await LinkModel.create(link);
                hyperlinks.push(storedLink._id);
            }
        }));

        project = { ...project, ...footer};
        project = {...project, hyperlinks: hyperlinks};

        const updatedProject = await ProjectModel.findOneAndUpdate(
            { _id: id },
            project,
            { new: true }
        );

        if (updatedProject) {
            return res.status(200).json(updatedProject);
        } 
       return res.status(404).json({"message":"Project not found with the provided ID"});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

export default updateProject;