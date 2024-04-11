import { ProjectModel } from "../../models/Project.js";
import { counter } from "../../models/Counter/Counter.js";

const reorderProject = async (req, res) => {
    const { project } = req.body;
    try {
        await Promise.all(project.map(async (proj, index) => {
            const updatedProject = await ProjectModel.findOneAndUpdate(
                { _id: proj._id },
                {order : index+1},
                { new: true }
            );
            console.log(updatedProject);
        }));

        const sequence = await counter.find();
        const result = await counter.findOneAndUpdate(
            { _id: sequence._id },
             { sequence_value: project.length },
            { upsert: true, new: true }
        );
        return res.status(200).json({ "message": "Order Updated Succesfully" });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};

export default reorderProject;