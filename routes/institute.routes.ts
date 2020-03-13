import { app } from './router';

import { verificaToken } from '../middlewares/authentication';
import { Request, Response } from 'express';
import IntituteSchema from '../classes/interfaces/institute.interface';
import { MongoError } from 'mongodb';

import * as _ from 'underscore';

// Todos los institutos
app.get('/institute', [verificaToken], (req: Request, res: Response) => {
    IntituteSchema.find().sort({ name: 1 }).exec((err, data) => {
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

// Institutos por ID
app.get('/institute/:id', [verificaToken], (req: Request, res: Response) => {
    let id = req.params.id;
    IntituteSchema.findById(id)
        .sort({
            name: 1
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
        })
});

// Institutos por "name"
app.get('/institute/name/:name', [verificaToken], (req: Request, res: Response) => {
    let name = req.params.name;
    IntituteSchema.findById(name)
        .sort({
            name: 1
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
        })
});

// Agregar instituto
app.post('/institute', [verificaToken], (req: Request, res: Response) => {
    let body = req.body;

    let institute = new IntituteSchema({
        name: body.name,
        address: body.address,
    });

    IntituteSchema.create(institute, (err: MongoError, data: any) => {
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

// Actualizar instituto
app.put('/institute/:id', [verificaToken], (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'name',
        'address',
    ]);

    IntituteSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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

// Eliminar Instituto
app.delete('/institute/:id', [verificaToken], (req: Request, res: Response) => {
    let id = req.params.id;

    IntituteSchema.findById({ id }).remove().exec((err, data) => {
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