const userModel = require('../models/User')


const makeUser = async () => {
    const newUser = await userModel.create({
        name: 'mel',
        email: 'mel@mel.com',
        password: '123456789'
    })

    console.log('new user!', newUser)
}


makeUser()