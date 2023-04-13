import Connection from "../middleware/mongo";
import admins from "../models/admins";
import bcrypt from "bcryptjs"
const handler = async (req, res) => {
    if (req.method === 'POST') {
        // fetch prodcuts from db
        let token = req.headers.authorization; // ? get token from headers
        if (!token) return res.status(401).json({ message: "No Token Provided" });
        token = token.split(" ")[1]; // ? remove Bearer from token
        // example token => 423gdswer3243fsd  => 423gdswer3243fsd
        if (token !== process.env.ADMIN_TOKEN)
            return res.status(401).json({ message: "Invalid Token" });
        let fetch;
        if (!req.body.id || !req.body.name || !req.body.email || !req.body.password || !req.body.role) {
            return res.status(400).json({ message: "Please Fill All Fields" });
        }
        // genrate a encrypted pas
        const EncryptedPass = bcrypt.hashSync(String(req.body.password));
        const obj = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: EncryptedPass.toString(),
            role: req.body.role,
        }
        try {
            fetch = req.body;
            let admin = new admins(obj);
            await admin.save();
           
        } catch (e) {
            console.log(e);
        }
        fetch
            ? res.status(200).json({
                data: "Admin Added Successfully",
            })
            : res.status(404).json({ message: "Error In Admin." });
    }
};

export default Connection(handler);