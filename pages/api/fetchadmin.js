import Connection from "../middleware/mongo";
import admins from "../models/admins";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        let fetch;
        try
        {
            fetch = await admins.find();
        }
        catch (e) {
            throw new Error('Failed to Add Fetch Admin');
        }
        fetch ? res.status(200).json({  
            data: fetch
        }) : res.status(404).json({ message: 'Error In Fetching Admin.' });
    }
};

export default Connection(handler);