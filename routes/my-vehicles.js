const router = require('express').Router();
const mongo = require('../mongodb-connection');

// ---------- helpers ----------
function toVehicleSummary(v) {
    return {
        id: v.id,
        targa: v.targa,
        marca: v.marca,
        modello: v.modello,
        specifica: v.specifica,
        km: v.km
    };
}

function sanitizeNotification(body) {
    const toNum = (v) => (v === null || v === undefined || v === '' ? null : Number(v));
    return {
        titolo: body.titolo ?? '',
        scadenzaKm: toNum(body.scadenzaKm),
        scadenzaGiorni: toNum(body.scadenzaGiorni),
        ultimaRegistrazioneKm: toNum(body.ultimaRegistrazioneKm),
        ultimaRegistrazioneData: body.ultimaRegistrazioneData ?? null,
        isDone: Boolean(body.isDone)
    };
}

// ---------- Vehicles ----------

// GET /
router.get('/', async (req, res) => {
    const vehicles = (await mongo.getAllVehicles()) || [];
    res.json(vehicles.map(toVehicleSummary));
});

// POST /
router.post('/', async (req, res) => {
    const vehicle = await mongo.insertVehicle(req.body);
    if (!vehicle) return res.status(500).json({ error: 'Failed to insert vehicle' });
    res.status(201).json(vehicle);
});

// GET id
router.get('/:id', async (req, res) => {
    const vehicle = await mongo.getVehicle(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(vehicle);
});

// DELETE id
router.delete('/:id', async (req, res) => {
    const deleted = await mongo.deleteVehicle(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Vehicle not found' });
    res.status(204).end();
});

// PUT id/km
router.put('/:id/km', async (req, res) => {
    const vehicle = await mongo.updateVehicleKm(req.params.id, req.body.km);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(vehicle);
});

// ---------- Notifications ----------

// POST id/notifications
router.post('/:id/notifications', async (req, res) => {
    const notification = await mongo.addNotification(req.params.id, sanitizeNotification(req.body));
    if (!notification) return res.status(404).json({ error: 'Vehicle not found' });
    res.status(201).json(notification);
});

// GET id/notifications/:notifId
router.get('/:id/notifications/:notifId', async (req, res) => {
    const { vehicle, notification } = await mongo.getNotification(req.params.id, req.params.notifId);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.json(notification);
});

// PUT id/notifications/:notifId
router.put('/:id/notifications/:notifId', async (req, res) => {
    const updated = await mongo.updateNotification(
        req.params.id,
        req.params.notifId,
        sanitizeNotification(req.body)
    );
    if (!updated) return res.status(404).json({ error: 'Vehicle or notification not found' });
    res.json(updated);
});

// DELETE id/notifications/:notifId
router.delete('/:id/notifications/:notifId', async (req, res) => {
    const modified = await mongo.deleteNotification(req.params.id, req.params.notifId);
    if (!modified) return res.status(404).json({ error: 'Vehicle or notification not found' });
    res.status(204).end();
});

// POST id/notifications/:notifId/done
router.post('/:id/notifications/:notifId/done', async (req, res) => {
    const notification = await mongo.markNotificationDone(
        req.params.id,
        req.params.notifId,
        req.body.km,
        req.body.data
    );
    if (!notification) return res.status(404).json({ error: 'Vehicle or notification not found' });
    res.json(notification);
});

router.use("/my-vehicles", router)

module.exports = router;