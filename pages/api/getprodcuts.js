import Connection from "../middleware/mongo";
import products from "../models/products";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        // fetch prodcuts from db
        let fetch;
        try {
            fetch = await products.find();
        } catch (e) {
            throw new Error('Failed to fetch In Products');
        }
        fetch ? res.status(200).json({
            data: fetch
        }) : res.status(404).json({ message: 'No Products Found' });
    }
};

export default Connection(handler);