var User = require("../models/user.js");

var apiResponse = require("../helper/api_response");
var successCode = require("../config/success_codes");
var errorCode = require("../config/error_codes");

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

//@route            GET api/users/
//@desc             Get users listing
//@access           Public
exports.listing = async function (req, res) {
  var message = errorCode.invalid_data.message;
  var status_code = 0;
  var data = [];

  try {

    data = myCache.get( "users" );
    if ( data == undefined ){
      // Check if a User exists ids in the db
      data = await User.find({},{__v: 0}).sort([["_id", -1]]);
      myCache.set( "users", data )
    }

    message = successCode.list.message;
    status_code = 1;
  } catch (err) {
    // Catch all exceptions
    if (err.kind == "ObjectId") {
      message = errorCode.id_mismatch.message;
    } else {
      message = err.message;
    }
  } finally {
    // Returning the response to the user
    res.send(apiResponse.makeResponse(data, message, status_code));
  }
};

//@route            GET api/:id/
//@desc             Get user detail
//@access           Public
exports.detail = async function (req, res) {
  const { id } = req.params;
  var message = errorCode.invalid_data.message;
  var status_code = 0;
  var data = {};
  try {

    // Check for required parameters
    if (!id) {
      message = errorCode.missing_fields.message;
      return;
    }

    // Find User Against the given Id
    data = await User.findById(id,{__v: 0});

    // Check id data exist or not
    if (!data) {
      message = errorCode.no_data.message;
      return;
    }

    message = successCode.detail.message;
    status_code = 1;
  } catch (err) {
    // Catch all the exceptions
    if (err.kind == "ObjectId") {
      message = errorCode.id_mismatch.message;
    } else {
      message = err.message;
    }
  } finally {
    // Send response to the user
    res.send(apiResponse.makeResponse(data, message, status_code));
  }
};

//@route            Post api/users/
//@desc             Create user
//@access           Public
exports.create = async (req, res) => {
  var result = {};
  var message = errorCode.invalid_data.message;
  var status_code = 0;
  const data = req.body;

  try {
    
    // Check for empty request object and if invalid object
    if ((data.length <= 0) || (!Array.isArray(data)))
    return;

    // Loop through the array and process each request
    for (userData of data) {

      // Check for required parameters
      if (!userData.display_name || !userData.phone_number) {
        message = errorCode.missing_fields.message;
        return;
      }
        
      // Create New User
      let newUser = new User(userData);
      await newUser.save();
      
      
    }

    myCache.del( "users" );
    message = successCode.create.message;
    status_code = 1;

  } catch (err) {
    //Catch all the exceptions
    message = err.message;
  } finally {
    // Send the response back to the client
    res.send(apiResponse.makeResponse(result, message, status_code));
  }
};

//@route            PUT api/users/
//@desc             Update users
//@access           Public
exports.update = async (req, res) => {
  var result = {};
  var message = errorCode.invalid_data.message;
  var status_code = 0;
  const data = req.body;

  try {
    
    // Check for empty request object and if invalid object
    if ((data.length <= 0) || (!Array.isArray(data)))
    return;

    for (userData of data) {

        // Check for required parameters
        if (!userData._id || !userData.display_name || !userData.phone_number) {
          message = errorCode.missing_fields.message;
          return;
        }
        
        // Check if a user exists against id in the system
        let existingUser = await User.findById(userData._id);
        if (existingUser) {
          existingUser.phone_number = userData.phone_number;
          existingUser.display_name = userData.display_name;
          existingUser.first_name = userData.first_name || "";
          existingUser.last_name = userData.last_name || "";
          existingUser.email_address = userData.email_address || "";
          existingUser.status = userData.status || 0;
        }
        await existingUser.save();

        
      }

      myCache.del( "users" );
      message = successCode.update.message;
      status_code = 1;

  } catch (err) {
    //Catch all the exceptions
    if (err.kind == "ObjectId") {
      message = errorCode.id_mismatch.message;
    } else {
      message = err.message;
    }
    status_code = 0;
  } finally {
    // Send the response back to the client
    res.send(apiResponse.makeResponse(result, message, status_code));
  }
};

//@route            DELETE api/users/:id/
//@desc             Delete user
//@access           Public
exports.delete = async function (req, res) {
  const { id } = req.params;
  var message = errorCode.invalid_data.message;
  var status_code = 0;
  var data = {};
  try {

    // Check for required parameters
    if (!id) {
    message = errorCode.missing_fields.message;
    return;
    }

    // Find User Against the given Id
    data = await User.findByIdAndRemove(id);

    // Check id data exist or not
    if (!data) {
      message = errorCode.no_data.message;
      return;
    }

    myCache.del( "users" ); 
    message = successCode.delete.message;
    status_code = 1;
  } catch (err) {
    // Catch all the exceptions
    if (err.kind == "ObjectId") {
      message = errorCode.id_mismatch.message;
    } else {
      message = err.message;
    }
  } finally {
    // Send response to the user
    res.send(apiResponse.makeResponse(data, message, status_code));
  }
};