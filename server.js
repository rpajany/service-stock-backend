const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require("multer");
const fs = require("fs");
require('dotenv').config();

const userRoutes = require('./routes/user_route');
const item_master = require('./routes/itemMaster_route')
const purchase = require('./routes/purchase_route')
const purchase_detail = require('./routes/purchaseDetail_route')
const sales = require('./routes/sales_route')
const sales_detail = require('./routes/salesDetail_route')
const salesPayment = require('./routes/salesPayment_route')
const stockDetail_report = require('./routes/stockDetail_Report_route')
const uid = require('./routes/UID_route')
const business = require('./routes/business_route')
const quotation = require('./routes/quotation_route')
const quotation_detail = require('./routes/quotationDetail_route')
const quote_terms = require('./routes/quoteTerms_route')
const expense = require('./routes/expense_route')
const eng_stock = require('./routes/engStock_route')
const eng_stockDetail = require('./routes/engStockDetail_route')
const RMI = require('./routes/RMI_route')
const customer = require('./routes/customer_route')
const service = require('./routes/service_route')
const dc = require('./routes/Dc_route')
const dc_detail = require('./routes/DcDetail_route')



const logout = require('./routes/logout_route')
const auth = require('./routes/verifyAuth_route')
const { sendEmail } = require('./services/email_service');


// async function logout(req, res) {
//     res.clearCookie("token", { path: '/' }).status(200).json({
//         message: "Logout successful",
//         success: true,
//         error: false
//     });
// }

const port = process.env.PORT || 8080;
const upload = multer({ dest: "uploads/" });  // destination folder for uploads

const app = express();
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true); // Allows all origins
    },
    credentials: true
}));

var allowlist = ['http://localhost:3000', 'http://192.168.1.10:3000']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    const origin = req.header('Origin');

    if (allowlist.indexOf(origin) !== -1) {
        corsOptions = { origin: true, credentials: true }; // Allow this origin
    } else {
        corsOptions = { origin: false }; // Disallow this origin
    }

    // Callback expects two parameters: error and options
    callback(null, corsOptions);
};

// Use CORS with the dynamic options
// app.use(cors(corsOptionsDelegate));

//app.use(bodyParser.json());
// app.use(express.json());

// Set a higher limit (e.g., 10MB)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb" })); // Increase limit if needed for larger images

app.use(cookieParser()); // to get json web token


require('./config/db'); // connect to db

// serve upload folder files
app.use('/upload', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/user', userRoutes); // user api
app.use('/api/item_master', item_master); // item_master api
app.use('/api/purchase', purchase); // purchase api
app.use('/api/purchase_detail', purchase_detail); // purchase_detail api
app.use('/api/sales', sales); // sales api
app.use('/api/sales_detail', sales_detail); // sales_detail api
app.use('/api/sales_payment', salesPayment); // salesPay_detail api
app.use('/api/stockDetail_report', stockDetail_report); // stockDetail_report api
app.use('/api/uid', uid); // UID api
app.use('/api/business', business); // bussiness api
app.use('/api/quotation', quotation); // quotation api
app.use('/api/quotation_detail', quotation_detail); // quotation_detail api
app.use('/api/quote_terms', quote_terms); // quotation_detail api
app.use('/api/expense', expense); // expense api
app.use('/api/eng_stock', eng_stock); // eng_stock api
app.use('/api/eng_stockDetail', eng_stockDetail); // eng_stockDetail api
app.use('/api/RMI', RMI); // eng_stockDetail api
app.use('/api/customer', customer); // customer api
app.use('/api/service', service); // customer api
app.use('/api/dc', dc); // DC api
app.use('/api/dc_detail', dc_detail); // DC_detail api

app.use('/api/logout', logout); // logout api
app.use('/api/auth', auth); // logout api

app.post('/api/send-email', upload.single("attachment"), async (req, res) => {
    const { to, subject, text, html, cc, bcc } = req.body;
    const file = req.file;

    // console.log("to :", to)
    // console.log("File :", file)

    try {

        const info = await sendEmail(to, subject, text, html, cc, bcc, file);

        // Clean up uploaded file after successful send
        if (file && file.path) {
            fs.unlink(file.path, (err) => {
                if (err) console.error('❌ Error deleting file:', err);
                // else
                //     console.log('✅ Temp file deleted:', file.path);
            });
        }

        res.json({
            data: '✅ Email sent successfully!',
            success: true,
            error: false,
            message: "✅ Email sent successfully!", info
        });

    } catch (error) {
        console.error("❌ Failed to send email:", error);
        res.status(500).json({ error: "Error sending email", details: error.message });
    }

})

app.listen(port, '0.0.0.0', () => console.log(`server is listening on url http://localhost:${port}`));