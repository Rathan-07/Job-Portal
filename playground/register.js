const bcryptjs = require('bcryptjs')
const password = 'secret123'

// bcryptjs.genSalt()
// .then((salt)=>{
//     console.log('salt',salt,salt.length);
//     bcryptjs.hash(password,salt)
//     .then((encrypted)=>{
//         console.log('encrypted',encrypted, encrypted.length);
//     })

// })

async function generateHash(){
    const salt = await bcryptjs.genSalt()
    const encrypted = await bcryptjs.hash(password,salt)
    console.log(encrypted);
}
generateHash()
