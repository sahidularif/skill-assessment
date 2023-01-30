const Billing = require("../models/Billing");

const serviceHandler = {}


serviceHandler.getAllBill = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    console.log(search)
    const billings = await Billing.find({
      name: { $regex: search, $options: "i" },
    })
      .skip(page * limit)
      .limit(limit);

    const total = await Billing.countDocuments({
      name: { $regex: search, $options: "i" },
      email: { $regex: search, $options: "i" },
      phone: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      billings,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }

}

serviceHandler.getUserBill = async (req, res, next) => {
  try {
    const bill = Billing.find({uid: req.params.id})
    // console.log(bill)
    res.status(200).send(bill);
  } catch (e) {
    console.log(e)
  }
}
serviceHandler.addBill = async (req, res, next) => {

  try {
    const billing = {
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      paid: req.body.payableAmunt
    }
    const newBilling = new Billing(billing)
    newBilling.save(function (err, doc) {
      if (!err) {
        res.status(200).send(doc);
        console.log(doc)
      }
    });

  } catch (err) {
    res.status(500).json(err);
  }

}

serviceHandler.updateBilling = (req, res, next) => {
  const updateDoc = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    paid: req.body.payableAmunt
  }
  Billing.findByIdAndUpdate({ _id: req.params.id }, updateDoc,
    (err, docs) => {
      if (err) {
        res.status(500).send(`There was a problem while updating your doc!`)
        throw err
      } else {
        res.status(200).send(docs)
      }
    });
};

serviceHandler.deleteBilling = (req, res, next) => {
  Billing.deleteOne({ _id: req.params.id })
    .then(function () {
      res.status(200).send("Billing successfully deleted")
    }).catch(function (err) {
      console.log(err);
      res.status(500).send("There was a server side error!")
    });
};







module.exports = serviceHandler