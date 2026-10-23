/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')

router.get('/materials', [controllers.Materials, 'index'])
router.post('/materials', [controllers.Materials, 'store'])
router.get('/materials/:id/edit', [controllers.Materials, 'edit'])
router.post('/materials/:id', [controllers.Materials, 'update'])
router.post('/materials/:id/delete', [controllers.Materials, 'destroy'])

router.get('/reservations', [controllers.Reservations, 'index'])
router.post('/reservations', [controllers.Reservations, 'store'])
router.get('/reservations/availability', [
  controllers.Reservations,
  'availability',
])
router.post('/reservations/:id/cancel', [
  controllers.Reservations,
  'cancel',
])
