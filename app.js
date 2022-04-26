require('dotenv').config();
const express = require('express');
const con = require('./dbconfig');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/calldata', (req, res) => {
    const { AssetNumber } = req.body;
    const sql = "SELECT Inventory_Number,Year ,Asset_Description, Location, Room, Status , status_scan FROM item WHERE Inventory_Number = ? AND Year = Year(CURRENT_DATE)";
    con.query(sql, [AssetNumber], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            res.send(result);
        }
    });
});

app.post('/updateData', (req, res) => {
    const { emailCommittee, Inventory_Number, year, localtion, room, status, dateScan } = req.body;
    console.log(emailCommittee, localtion, room, status, dateScan , Inventory_Number , year);
    const sql = "UPDATE item SET Email_Committee=?,Location=?,Room=?,Status=?,Date_scan=?,status_scan=? WHERE Year = ? AND Inventory_Number = ?";
    con.query(sql, [emailCommittee, localtion, room, status, dateScan, 1, year, Inventory_Number], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            if (result.affectedRows != 1) {
                res.status(500).send("Update error");
            } else {
                res.send("Asset checked !!");
            }
        }
    });

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running at ' + PORT);
});