import { EventEmitter } from 'node:events'
import { createAlert } from '../Utility/createAlerts.js'

export const sightingEvents = new EventEmitter()

sightingEvents.on('sighting-added', createAlert)