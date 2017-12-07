var Sequelize = require("sequelize");
const pg = require('pg');
pg.defaults.ssl = true;

// SETS UP DATABASE 
const sequelize = new Sequelize(process.env.MEMBERS_DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres'
});

// CHECKS CONNECTION TO DATABASE 
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// SETS UP A USER
const member = sequelize.define('members', {
    name: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    amount: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
    headshot: {
        type: Sequelize.STRING
    },
    support: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
});

// SETS UP GROUP_TO_CREATOR
const groupToCreator = sequelize.define('group_single', {
    creator_id: {
        type: Sequelize.INTEGER
    }
});

// SETS UP PASS_RESET
const passReset = sequelize.define('pass_resets', {
    email: {
        type: Sequelize.STRING
    },
    link: {
        type: Sequelize.STRING
    }
});

// SETS UP PAYMENT
const payment = sequelize.define('payments', {
    amount: {
        type: Sequelize.INTEGER
    },
    counter: {
        type: Sequelize.INTEGER
    },
    subscription_id: {
        type: Sequelize.STRING
    }
});

// SETS UP USER_TO_PAYMENT
const userToPayment = sequelize.define('user_payment', {
    user_id: {
        type: Sequelize.INTEGER
    },
    payment_id: {
        type: Sequelize.INTEGER
    }
});

// SETS UP MEMBER_TO_GROUP
const memberToGroup = sequelize.define('member_group', {
    user_id: {
        type: Sequelize.INTEGER
    },
    group_id: {
        type: Sequelize.INTEGER
    }
});

module.exports.models = {
    member,
    groupToCreator,
    passReset,
    payment,
    userToPayment,
    memberToGroup
};