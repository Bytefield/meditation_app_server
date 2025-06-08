import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor ingresa tu nombre'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Por favor ingresa tu correo electrónico'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor ingresa un correo electrónico válido',
      ],
    },
    password: {
      type: String,
      required: [true, 'Por favor ingresa una contraseña'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    moodHistory: [
      {
        mood: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('Entrando a matchPassword');
  console.log('Tipo de enteredPassword:', typeof enteredPassword, 'Longitud:', enteredPassword?.length);
  console.log('Tipo de this.password:', typeof this.password, 'Longitud:', this.password?.length);
  
  if (!enteredPassword || !this.password) {
    console.log('Falta contraseña o contraseña almacenada');
    return false;
  }
  
  try {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log('Resultado de bcrypt.compare:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error en bcrypt.compare:', error);
    return false;
  }
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
