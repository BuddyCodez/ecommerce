import Connection from "../middleware/mongo";
import navcategories from "../models/navcategories";
const Handler = async (req, res) => {
    if (req.method === 'GET') {
        // fetch prodcuts from db
        let fetch;
        try {
            fetch = await navcategories.find();
        } catch (e) {
            throw new Error('Failed to fetch In NavCategories!');
        }
        fetch ? res.status(200).json({
            data: fetch
        }) : res.status(404).json({ message: 'No NavCategories Found!' });
    } else if (req.method === 'POST') {
        const { title, subcategories, images } = req.body;
        if (!title || !subcategories) {
            res.status(422).json({ message: 'Invalid Input' });

        }
        try {
            
            const newNav = new navcategories({
                title: title,
                subcategories: subcategories,
                images: images
            });
            await newNav.save();
            res.status(201).json({ message: 'New Nav Category Created' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Failed to Create New Nav Category' });
        }
    }
};
export default Connection(Handler);