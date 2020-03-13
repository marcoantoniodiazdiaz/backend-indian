import { app } from './router';

import { verificaToken } from '../middlewares/authentication';
import { Request, Response } from 'express';
import AssignmentSchema from '../classes/interfaces/assignment.interface';
import { MongoError } from 'mongodb';

import * as _ from 'underscore';

// Todos los institutos
app.get('/assignment', [verificaToken], (req: Request, res: Response) => {
    AssignmentSchema.find().sort({ name: 1 }).exec((err, data) => {
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
app.get('/assignment/:id', [verificaToken], (req: Request, res: Response) => {
    let id = req.params.id;
    AssignmentSchema.findById(id)
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
app.get('/assignment/name/:name', [verificaToken], (req: Request, res: Response) => {
    let name = req.params.name;
    AssignmentSchema.findById(name)
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
app.post('/assignment', [verificaToken], (req: Request, res: Response) => {
    let body = req.body;

    let assignment = new AssignmentSchema({
        publishDate: body.publishDate,
        expireDate: body.expireDate,
        points: body.points,
        description: body.description,
        group: body.group
    });

    AssignmentSchema.create(assignment, (err: MongoError, data: any) => {
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
app.put('/assignment/:id', [verificaToken], (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'name',
        'address',
    ]);

    AssignmentSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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
app.delete('/assignment/:id', [verificaToken], (req: Request, res: Response) => {
    let id = req.params.id;

    AssignmentSchema.findById({ id }).remove().exec((err, data) => {
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