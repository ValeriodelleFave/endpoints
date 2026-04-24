const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'cars.json');

// ---------- helpers ----------
function readVehicles() {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeVehicles(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function nextId(list) {
    let id = Math.floor(Math.random() * 1000000);
    while (list.some(el => el.id === id)) {
        id = Math.floor(Math.random() * 1000000);
    }
    return id;
}

function findVehicle(vehicles, id) {
    return vehicles.find(v => v.id === Number(id));
}

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

// GET /my-vehicles
router.get('/my-vehicles', (req, res) => {
    const vehicles = readVehicles();
    res.json(vehicles.map(toVehicleSummary));
});

// POST /my-vehicles
router.post('/my-vehicles', (req, res) => {
    const vehicles = readVehicles();
    const vehicle = {
        id: nextId(vehicles),
        targa: req.body.targa,
        marca: req.body.marca,
        modello: req.body.modello,
        specifica: req.body.specifica,
        km: Number(req.body.km) || 0,
        notifications: []
    };
    vehicles.push(vehicle);
    writeVehicles(vehicles);
    res.status(201).json(vehicle);
});

// GET /my-vehicles/:id
router.get('/my-vehicles/:id', (req, res) => {
    const vehicles = readVehicles();
    const vehicle = findVehicle(vehicles, req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(vehicle);
});

// DELETE /my-vehicles/:id
router.delete('/my-vehicles/:id', (req, res) => {
    const vehicles = readVehicles();
    const idx = vehicles.findIndex(v => v.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Vehicle not found' });
    vehicles.splice(idx, 1);
    writeVehicles(vehicles);
    res.status(204).end();
});

// PUT /my-vehicles/:id/km
router.put('/my-vehicles/:id/km', (req, res) => {
    const vehicles = readVehicles();
    const vehicle = findVehicle(vehicles, req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    vehicle.km = Number(req.body.km);
    writeVehicles(vehicles);
    res.json(vehicle);
});

// ---------- Notifications ----------

// POST /my-vehicles/:id/notifications
router.post('/my-vehicles/:id/notifications', (req, res) => {
    const vehicles = readVehicles();
    const vehicle = findVehicle(vehicles, req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    if (!Array.isArray(vehicle.notifications)) vehicle.notifications = [];

    const notification = {
        id: nextId(vehicle.notifications),
        ...sanitizeNotification(req.body)
    };
    vehicle.notifications.push(notification);
    writeVehicles(vehicles);
    res.status(201).json(notification);
});

// GET /my-vehicles/:id/notifications/:notifId
router.get('/my-vehicles/:id/notifications/:notifId', (req, res) => {
    const vehicles = readVehicles();
    const vehicle = findVehicle(vehicles, req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    const notification = (vehicle.notifications || []).find(n => n.id === Number(req.params.notifId));
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.json(notification);
});

// PUT /my-vehicles/:id/notifications/:notifId
router.put('/my-vehicles/:id/notifications/:notifId', (req, res) => {
    const vehicles = readVehicles();
    const vehicle = findVehicle(vehicles, req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    const idx = (vehicle.notifications || []).findIndex(n => n.id === Number(req.params.notifId));
    if (idx === -1) return res.status(404).json({ error: 'Notification not found' });

    vehicle.notifications[idx] = {
        id: vehicle.notifications[idx].id,
        ...sanitizeNotification(req.body)
    };
    writeVehicles(vehicles);
    res.json(vehicle.notifications[idx]);
});

// DELETE /my-vehicles/:id/notifications/:notifId
router.delete('/my-vehicles/:id/notifications/:notifId', (req, res) => {
    const vehicles = readVehicles();
    const vehicle = findVehicle(vehicles, req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    const idx = (vehicle.notifications || []).findIndex(n => n.id === Number(req.params.notifId));
    if (idx === -1) return res.status(404).json({ error: 'Notification not found' });

    vehicle.notifications.splice(idx, 1);
    writeVehicles(vehicles);
    res.status(204).end();
});

// POST /my-vehicles/:id/notifications/:notifId/done
router.post('/my-vehicles/:id/notifications/:notifId/done', (req, res) => {
    const vehicles = readVehicles();
    const vehicle = findVehicle(vehicles, req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    const notification = (vehicle.notifications || []).find(n => n.id === Number(req.params.notifId));
    if (!notification) return res.status(404).json({ error: 'Notification not found' });

    notification.ultimaRegistrazioneKm = req.body.km !== undefined ? Number(req.body.km) : notification.ultimaRegistrazioneKm;
    notification.ultimaRegistrazioneData = req.body.data ?? notification.ultimaRegistrazioneData;
    writeVehicles(vehicles);
    res.json(notification);
});

module.exports = router;