import seedPersonas from './seed_personas.js'
import seedProductos from './seed_productos.js'
import seedHistorico from './seed_historico.js'
await seedPersonas.inicializarDesdeJSON('./seed/personas.json');
await seedProductos.inicializarDesdeJSON('./seed/productos.json');
await seedHistorico.inicializarDesdeJSON('./seed/historico.json');