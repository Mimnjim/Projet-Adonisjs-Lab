/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
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

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('/dashboard').render('pages/dashboard').as('dashboard')
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())
