import { GeneralModel } from "../../models/General.js";

const putGeneral = async (req, res) => {
    const { brief, resume } = req.body;

    if (brief === null && resume === null)
        return res.status(404).json({ "message": "Empty feilds detected" });

    try {
        const general = await GeneralModel.find({});

        // Update specific fields using findOneAndUpdate
        const updatedGeneral = await GeneralModel.findOneAndUpdate(
            { _id: general[0]._id }, // Match by ID
            { $set: { brief, resume } }, // Update operators
            { new: true } // Return the updated document
        );

        if (!updatedGeneral) {
            return res.status(400).json({ message: 'Update failed (possibly validation error)' });
        }

        return res.status(200).json({ message: 'Info updated successfully', data: updatedGeneral });
    }
    catch (err) {
        return res.status(500).json({ "message": err.message });
    }

};

export default putGeneral;