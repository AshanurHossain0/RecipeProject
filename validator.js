exports.validName=(name)=>{
    let regx = /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z]{1,})$/;
    return regx.test(name);
}
exports.validEmail = (email) => {
    return (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(email));
}

exports.validGender=(gender)=>{
    return ["male","female","others"].includes(gender);
}

exports.validPassword=(password)=>{
    return (password.length>4 && password.length<=14)
}