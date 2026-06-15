import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

const authController = {
  signup: async (req, res) => {
    const { nom, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let userRole = 'user';

    if (role === 'admin' || role === 'moderator') {
      if (req.user && req.user.role === 'admin') {
        userRole = role;
      } else {
        return res.status(403).json({
          status: 'fail',
          message: 'Accounts creating is an admin only feature',
        });
      }
    }

    const newUser = new User({
      nom,
      email,
      password: hashedPassword,
      role: userRole,
    });

    newUser
      .save()
      .then((user) =>
        res.status(201).json({
          status: 'success',
          message: 'User created with sucess',
          data: { user },
        }),
      )
      .catch((e) =>
        res.status(400).json({
          status: 'fail',
          error: e,
        }),
      );
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Utilisateur non trouvé',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'fail',
        message: 'Mot de passe incorrect',
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );

    res.status(200).json({
      status: 'success',
      userId: user._id,
      role: user.role,
      token,
    });
  },
};

export default authController;
