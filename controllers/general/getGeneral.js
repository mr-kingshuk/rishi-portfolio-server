import { GeneralModel } from "../../models/General.js";

const getGeneral = async (req, res) => {
    try{
        const general = await GeneralModel.find({}).select({brief: 1, resume: 1, _id: -1});
        return res.status(200).json(general[0]);
    }
    catch(err){
        return res.status(500).json({"message": err.message})
    }
};

export default getGeneral;