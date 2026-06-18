const jwt = require(
  "jsonwebtoken"
);

const SECRET =
  process.env.JWT_SECRET;

function verificarToken(
  req,
  res,
  next
) {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    return res
      .status(401)
      .json({
        mensagem:
          "Token não enviado",
      });

  }

  const token =
    authHeader.split(" ")[1];

  jwt.verify(
    token,
    SECRET,

    (err, decoded) => {

      if (err) {

        return res
          .status(403)
          .json({
            mensagem:
              "Token inválido",
          });

      }

      req.usuario =
        decoded;

      next();

    }
  );
}

module.exports =
  verificarToken;