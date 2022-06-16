const bcrypt = require('bcrypt');
const dbConnection = require('../database/connections');
const jwtGenerator = require('../utils/jwtGenerator');
const controllerAuth = {};

// signup a new user (create user)
controllerAuth.register = async (req, res) => {
  const { user_name, identification, email, password } = req.body;

  try {
    dbConnection.query(
      'SELECT * FROM user WHERE email = ? LIMIT 1',
      [email],
      async (err, result) => {
        if (result.length) {
          return res.status(401).json({
            status: 401,
            success: false,
            msg: 'Error => Usuario ya existe',
          });
        }
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
      }
    );
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Server Error',
    });
  }
};

// login
controllerAuth.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    dbConnection.query(
      'SELECT * FROM user WHERE email = ?',
      [email],
      async (err, result) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: 'Error =' + err,
          });
        }

        if (result.length === 0) {
          return res.status(400).json({
            status: 400,
            success: false,
            msg: 'Usuario no existe',
          });
        }
        const validPassword = await bcrypt.compare(
          password,
          result[0].password
        );

        if (!validPassword) {
          res.status(403).json({
            status: 403,
            success: false,
            msg: 'Clave invalida',
          });
          return;
        }

        const token = jwtGenerator(result[0].email);

        const datos_cliente = { ...result[0] };

        res.status(200).json({
          status: 200,
          success: true,
          count: 1,
          data: datos_cliente,
          token,
          message: 'ok',
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Server Error',
    });
  }
};

// verify if user is veriefied
controllerAuth.verify = async (req, res) => {
  const email = req.user;
  try {
    res.status(200).json({
      status: 200,
      success: true,
      token: req.token,
      user_email: req.user,
      message: 'ok',
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Token is not valid - acceso restringido',
    });
  }
};

module.exports = controllerAuth;
