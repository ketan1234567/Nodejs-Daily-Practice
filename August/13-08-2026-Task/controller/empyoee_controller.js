const db = require('../config/db');



// const showdata = (main, error) => {
//     db.query("SELECT * FROM employees WHERE id=?", [7], (error, main) => {
//         if (error) {
//             console.log(error);
//         }
//         console.log(main);
//     });
// }


const getData = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [rows] = await db.query(
            "SELECT * FROM employees WHERE id=?",
            [id]
        );

        console.log(rows);

        res.json(rows);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getData;