import { Request, Response } from 'express';
import UserSchema from '../classes/interfaces/user.interface';
import { MongoError } from 'mongodb';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';
import bcrypt from 'bcrypt';

import { app } from './router';

app.get('/users', [verificaToken], (req: Request, res: Response) => {
  UserSchema.find().sort({ firstName: 1 }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      data
    });
  });
});

app.get('/users/:id', [verificaToken], (req: Request, res: Response) => {
  let id = req.params.id;

  UserSchema.findById(id).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      data
    });
  });
});

app.get('/users/firstName/:firstName', [verificaToken], (req: Request, res: Response) => {
  let firstName = req.params.firstName;
  let regex = new RegExp(firstName);

  UserSchema.find({
    firstName: {
      $regex: regex
    }
  })
    .sort({
      firstName: 1
    })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        data
      });
    });
}
);

app.post('/users', [verificaToken, verificaAdmin_Role], (req: Request, res: Response) => {
  let body = req.body;

  let clientes = new UserSchema({
    firstName: body.firstName,
    secondName: body.secondName,
    institute: body.institute,
    email: body.email,
  });

  UserSchema.create(clientes, (err: MongoError, data: any) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      data
    });
  });
});

// Update User
app.put('/clientes/:id', [verificaToken, verificaAdmin_Role], (req: Request, res: Response) => {
  let id = req.params.id;
  let body = _.pick(req.body, [
    'firstName',
    'secondName',
    'institute',
    'role',
    'email',
  ]);

  UserSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      data: data
    });
  });
});

// Dalete User
app.delete('/users/:id', [verificaToken, verificaAdmin_Role], (req: Request, res: Response) => {
  let id = req.params.id;

  UserSchema.findById({ id }).remove().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      data
    });
  });
});

// Activate User
app.put('/users/activate/:email', (req, res) => {
  let email = req.params.email;
  let body = _.pick(req.body, ['password', 'activated']);

  if (body.password == [] || body.password == null) {
    return res.status(400).json({
      ok: false,
      err: 'Error al activar, datos no validos'
    });
  }

  let encypted = bcrypt.hashSync(body.password, 10);

  body.password = encypted;

  UserSchema.findOneAndUpdate({ email, activated: false }, body, { new: true, runValidators: true }, (err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if (!data) {
      return res.status(400).json({
        ok: false,
        err: 'El usuario ya esta activo o no existe'
      });
    }

    res.json({
      ok: true,
      data: data
    });
  });
});

export default app;
