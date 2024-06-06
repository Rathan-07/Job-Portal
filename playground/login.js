const bcryptjs = require('bcryptjs')
const hashPassword = `$2a$10$T.A3QInA8XzhYZhyKkGFqec9MGM5QKdWmgI1SXMvemwiA1sGhqJqa`
const password = "secrete@123"

// extracting salt, using the salt on the given password , and comparing the new Hashed password
 
// const salt = bcryptjs.getSalt(hashPassword)
// const salt = hashPassword.slice(0,29)
// bcryptjs.hash(password,salt)
// .then((hp)=>{
//     console.log(hp === hashPassword);
// })

bcryptjs.compare(password,hashPassword)
.then((result)=>{
    console.log(result);
})