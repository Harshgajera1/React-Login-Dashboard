var url
var reqBody

const setReqParams = (URL,reqbody) =>{
    url = URL
    reqBody = reqbody
}

console.log(url,reqBody)

module.exports = {
    setReqParams,
    url,
    reqBody
}