async function info(req, res) {
    return res.status(200).json({
        success: true, // API is successfully executed or not
        message: "API Gateway Service is Live", // send a custom message to educate the end-users
        error: {}, // expose the detailed error
        data: {}, // fetch some data from the API
    })
}

export default {info};