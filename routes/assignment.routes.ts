import { app } from './router';

import { verificaToken } from '../middlewares/authentication';
import { Request, Response } from 'express';
import AssignmentSchema from '../classes/interfaces/assignment.interface';
import { MongoError } from 'mongodb';

import * as _ from 'underscore';

// Todas las asignaciones
app.get('/assignment', [verificaToken], (req: Request, res: Response) => {
    AssignmentSchema.find().exec((err, data) => {
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

// Asignaciones por ID
app.get('/assignment/:id', [verificaToken], (req: Request, res: Response) => {
    let id = req.params.id;
    AssignmentSchema.findById(id).exec((err, data) => {
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

// Asignaciones por grupo
app.get('/assignment/group/:group', [verificaToken], (req: Request, res: Response) => {
    let group = req.params.group;
    AssignmentSchema.find(group).exec((err, data) => {
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
        'publishDate',
        'expireDate',
        'points',
        'description',
        'group',
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