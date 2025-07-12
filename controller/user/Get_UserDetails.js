// Import database
const knex = require('../../config/db');

exports.Get_UserDetails = async (req, res) => {
    // console.log(req)
    try {
        const userData = await knex.select('user_id', 'username', 'role')
            .from('tbl_User')
            .where('user_id', '=', req.user_id); // get from cookies data

        // console.log('userData', userData)

        // Ensure you're working with the first object from userData
if (userData.length === 0) {
  return res.status(404).json({
    data: null,
    error: true,
    success: false,
    message: "User not found",
  });
}

 const companyData = await knex.select('*')
            .from('tbl_Business');


     const user = userData[0]; // Extract the first row


const newData = {
  ...user,
  Company: companyData[0].Business, // Add new field
};


        res.status(200).json({ // on success return user details
            data: newData,
            error: false,
            success: true,
            message: "Get Userdetails"
        })





    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}