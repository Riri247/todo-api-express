const validateFields = (obj,allowedFields) =>{
    const sentFields = Object.keys(obj ||{});
    return sentFields.filter(f => !allowedFields.includes(f));
}

module.exports = {
    validateFields
};