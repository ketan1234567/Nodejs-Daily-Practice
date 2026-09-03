const db=require('../config/db')

const getUsers = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        // Search
        const search = req.query.search || "";
        const searchValue = `%${search}%`;
        // Total records
        const [countResult] = await db.query(
            `SELECT COUNT(*) AS total
             FROM leads
             WHERE
                firstName LIKE ?
                OR lastName LIKE ?
                OR email LIKE ?
                OR phone LIKE ?
                OR company LIKE ?
                OR jobTitle LIKE ?
                OR city LIKE ?
                OR country LIKE ?`,
            [
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue
            ]
        );


        const totalRecords = countResult[0].total;


        // Get records
        const [rows] = await db.query(
            `SELECT
                id,
                firstName,
                lastName,
                email,
                phone,
                company,
                jobTitle,
                city,
                country,
                message,
                created_at
             FROM leads
             WHERE
                firstName LIKE ?
                OR lastName LIKE ?
                OR email LIKE ?
                OR phone LIKE ?
                OR company LIKE ?
                OR jobTitle LIKE ?
                OR city LIKE ?
                OR country LIKE ?
             ORDER BY id ASC
             LIMIT ? OFFSET ?`,
            [
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                limit,
                offset
            ]
        );


        const totalPages = Math.ceil(totalRecords / limit);
        res.json({

            success: true,

            data: rows,

            pagination: {
                currentPage: page,
                limit: limit,
                totalRecords: totalRecords,
                totalPages: totalPages
            },
            search: search
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};

const updateUser=async(req,res)=>{
    try {
        const { id } = req.params;

        const {
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle,
            city,
            country,
            message
        } = req.body;


        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !company ||
            !jobTitle ||
            !city ||
            !country ||
            !message
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }


        const [result] = await db.query(
            `UPDATE leads
             SET
                firstName = ?,
                lastName = ?,
                email = ?,
                phone = ?,
                company = ?,
                jobTitle = ?,
                city = ?,
                country = ?,
                message = ?
             WHERE id = ?`,
            [
                firstName,
                lastName,
                email,
                phone,
                company,
                jobTitle,
                city,
                country,
                message,
                id
            ]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });

        }


        res.json({
            success: true,
            message: "Lead updated successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

    } 
const deleteUser=async(req,res)=>{
    try {
        const { id } = req.params;
        const [result] = await db.query(
            "DELETE FROM leads WHERE id = ?",
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }
        res.json({
            success: true,
            message: "Lead deleted successfully"
        });

    } catch (error) {
                res.status(500).json({
            success: false,
            message: "Server error"
        });
        
    }
}

module.exports={
    getUsers,
    deleteUser,
    updateUser
}