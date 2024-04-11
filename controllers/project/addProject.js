import { MediaModel } from "../../models/Media.js";
import { ProjectModel } from "../../models/Project.js";
import { counter } from "../../models/Counter/Counter.js";
import { LinkModel } from "../../models/Link.js";

const addProject = async (req, res) => {
    const { data, media, footer } = req.body;
    let { heroImage , ...project} = data;
    let projectMedia = [];

    try{
        if(data.heroImage){
            const heroMedia = await MediaModel.create(data.heroImage);
            project = {...project, heroImage: heroMedia._id};
        }
        else{
            project = {...project, heroImage: null};
        }
        
        await Promise.all(media.map(async (med) => {
            const { _id, ...rest } = med;
            const storedMed = await MediaModel.create(rest);
            projectMedia.push(storedMed._id);
        }));
        const orderNumber = await counter.increment();

        //footer addition
        let hyperlinks = [];
        await Promise.all(footer.hyperlinks.map(async (link) => {
            const storedLink = await LinkModel.create(link);
            hyperlinks.push(storedLink._id);
        }));

        project = { ...project, media: projectMedia, order: orderNumber, ...footer};
        project = {...project, hyperlinks: hyperlinks};
        
        const newProject = await ProjectModel.create(project);
        
        return res.status(200).json(newProject); 
    }
    catch(err){
        return res.status(400).json(err);
    }
};

export default addProject;