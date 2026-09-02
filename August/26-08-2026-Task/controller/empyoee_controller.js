const employees = [
    {
        id: 1,
        name: "Ketan",
        email: "ketan@gmail.com",
        salary: 50000
    },
    {
        id: 2,
        name: "Vishal",
        email: "vishal@gmail.com",
        salary: 60000
    }
];

const UpdateData = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, email, salary } = req.body

        const users = employees.find(emp => emp.id === id)

        if (!users) {
            res.json({
                message: 'Empyoee Not Found'
            })
            return
        }


        if (salary != undefined) {

            users.salary = req.body.salary
            res.json({
                message: "sucessfully_Updated",
                data: users
            })

        }

        if (name != undefined) {

            users.name = req.body.name
            res.json({
                message: "sucessfully_Updated",
                data: users
            })

        }
        if (email != undefined) {

            users.email = req.body.email
            res.json({
                message: "sucessfully_Updated",
                data: users
            })

        }










    } catch (error) {

    }
}

module.exports = UpdateData