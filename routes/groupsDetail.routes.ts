import { app } from './router';

import { verificaToken } from '../middlewares/authentication';
import { Request, Response } from 'express';
import GroupsDetailsSchema from '../classes/interfaces/groupsDetails.interface';
import { MongoError } from 'mongodb';

import * as _ from 'underscore';

// Todas los detalles de grupo
app.get('/groupDetail', [verificaToken], (req: Request, res: Response) => {
    GroupsDetailsSchema.find().exec((err, data) => {
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

// Detalles de grupo por ID
app.get('/groupDetail/:id', [verificaToken], (req: Request, res: Response) => {
    let id = req.params.id;
    GroupsDetailsSchema.findById(id).exec((err, data) => {
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

// Detalle por grupo
app.get('/groupDetail/group/:group', [verificaToken], (req: Request, res: Response) => {
    let group = req.params.group;
    GroupsDetailsSchema.find(group).exec((err, data) => {
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

// Agregar detalle de grupo
app.post('/groupDetail', [verificaToken], (req: Request, res: Response) => {
    let body = req.body;

    let groupDetail = new GroupsDetailsSchema({
        group: body.group,
        user: body.user,
        userDateLogin: body.userDateLogin
    });

    GroupsDetailsSchema.create(groupDetail, (err: MongoError, data: any) => {
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

// Actualizar detalle de grupo
app.put('/groupDetail/:id', [verificaToken], (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'group',
        'user',
        'userDateLogin',
    ]);

    GroupsDetailsSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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

// Eliminar detalle de grupo
app.delete('/groupDetail/:id', [verificaToken], (req: Request, res: Response) => {
    let id = req.params.id;

    GroupsDetailsSchema.findById({ id }).remove().exec((err, data) => {
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