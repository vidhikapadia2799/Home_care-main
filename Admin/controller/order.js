const client = require("../../Connection/connection");
const sgMail = require("@sendgrid/mail");

exports.ViewOrderData = function (req, res) {
  (async () => {
    const vieworder = await client.query(
      "select p.customer_id,placeorder_id ,s.sub_servicename ,s.price,s.time_duration ,p.area ,p.address ,c.firstname as customer_firstname,c.lastname as customer_lastname ,c.mobile_no as customer_mobileno ,p2.firstname as provider_firstname,p2.lastname as provider_lastname,p2.mobile_no as provider_mobileno,p.order_date ,p.order_status from placeorder p,customer c,provider p2,subservices s where c.customer_id =p.customer_id and s.subservice_id =p.subservice_id and s.provider_id =p2.provider_id  and order_status=$1",
      ["pending"],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json({
          status: "Success",
          data: response.rows,
          count: response.rowCount,
        });
      }
    );
  })();
};

exports.UpdateOrderData = function (req, res) {
  (async () => {
    const orderupdatedata = req.body;
    const updateorder = await client.query(
      "update placeorder set order_status=$1 where placeorder_id=$2",
      [orderupdatedata.orderstatus, orderupdatedata.placeorder_id],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        } else {
          const query = client.query(
            "select email from placeorder p ,customer c where p.customer_id=c.customer_id and placeorder_id=$1",
            [orderupdatedata.placeorder_id],
            (error, response) => {
              if (error) {
                res.status(401).json(error);
              } else {
                const email = response.rows[0]["email"];

                console.log(email);
                sgMail.setApiKey(
                  "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"
                );

                const msg = {
                  to: email, // Change to your recipient
                  from: "wecarehomecare.2511@gmail.com", // Change to your verified sender
                  subject: "WeCareHomecare Password Reset Code ",
                  text: "Your Password Reset Otp is",
                  html:
                    "<strong>Your Order is " +
                    orderupdatedata.orderstatus +
                    "</strong>",
                };
                sgMail
                  .send(msg)
                  .then(() => {
                    res.status(200).json({
                      status: "Success",
                      msg: "Updated order Successfully",
                    });
                    console.log("Email sent");
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            }
          );
        }
      }
    );
  })();
};

exports.HistoryOrderData = function (req, res) {
  (async () => {
    const historyorder = await client.query(
      "select p.customer_id ,s.sub_servicename ,s.price,s.time_duration ,p.area ,p.address ,c.firstname as customer_firstname,c.lastname as customer_lastname ,c.mobile_no as customer_mobileno ,p2.firstname as provider_firstname,p2.lastname as provider_lastname,p2.mobile_no as provider_mobileno,p.order_date ,p.order_status from placeorder p,customer c,provider p2,subservices s where c.customer_id =p.customer_id and s.subservice_id =p.subservice_id and order_status!=$1",
      ["pending"],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        } else {
          sgMail.setApiKey(
            "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"
          );
          const msg = {
            to: emailval.email, // Change to your recipient
            from: "wecarehomecare.2511@gmail.com", // Change to your verified sender
            subject: "WeCareHomecare Password Reset Code ",
            text: "Your Password Reset Otp is",
            html: "<strong>Your Password Reset Otp is " + otp + "</strong>",
          };
          sgMail
            .send(msg)
            .then(() => {
              res.status(200).json({
                status: "Success",
              });
              console.log("Email sent");
            })
            .catch((error) => {
              console.error(error);
            });
        }
        res.status(200).json({
          status: "Success",
          data: response.rows,
        });
      }
    );
  })();
};
