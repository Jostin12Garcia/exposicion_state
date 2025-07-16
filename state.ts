class Reemplazo {
  private state: StateReemplazo;              // Guarda el state actual del proceso (Diseno, Revision, etc).
  aprobado: boolean;                          // Indica si está aprobado o no.

  constructor() {
    this.aprobado = false;                    // Inicializa aprobado como falso.
    this.state = new Diseno();                // El state inicial es Diseno.
    console.log(this, "state_inicial");
  }

  get getState() {
    return this.state;                        // Retorna el state actual.
  }

  set setState(state: StateReemplazo) {
    this.state = state;                       // Cambia el state actual.
  }

  aprobar(aprobado: boolean) {
    return this.state.aprobar(this, aprobado); // Ejecuta la acción aprobar según el state actual.
  }
}

interface StateReemplazo {
  aprobar(reemplazo: Reemplazo, aprobado: boolean): void; 
}
class Diseno implements StateReemplazo {
  aprobar(reemplazo: Reemplazo, aprobado: boolean): void {
    reemplazo.aprobado = aprobado;            // Actualiza aprobado.
    if (aprobado) {
      reemplazo.setState = new Revision();    // Si aprueba, pasa a state Revision.
      console.log(reemplazo, "diseno_aprobado");
    }
    if (!aprobado) {
      console.log(reemplazo, "diseno_no_aprobado");
    }
  }
}

class Revision implements StateReemplazo {
  aprobar(reemplazo: Reemplazo, aprobado: boolean): void {
    reemplazo.aprobado = aprobado;            // Actualiza aprobado.
    if (aprobado) {
      reemplazo.setState = new Construccion(); // Si aprueba, pasa a Construccion.
      console.log(reemplazo, "revision_aprobada");
    }
    if (!aprobado) {
      reemplazo.setState = new Diseno();      // Si no aprueba, vuelve a Diseno.
      console.log(reemplazo, "revision_no_aprobada_vuelve_a_diseno");
    }
  }
}

class Construccion implements StateReemplazo {
  aprobar(reemplazo: Reemplazo, aprobado: boolean): void {
    reemplazo.aprobado = aprobado;            // Actualiza aprobado.
    if (aprobado) {
      reemplazo.setState = new Finalizado();  // Si aprueba, pasa a Finalizado.
      console.log(reemplazo, "construccion_aprobada");
    }
  }
}

class Finalizado implements StateReemplazo {
  aprobar(reemplazo: Reemplazo, aprobado: boolean): void {
    console.log(reemplazo, "finalizado");     // Ya finalizado, solo muestra el state.
  }
}

const reemplazo = new Reemplazo();            // Crea una instancia nueva (state Diseno).
reemplazo.aprobar(true);                      // Aprueba diseño y pasa a Revision.
reemplazo.aprobar(true);                      // Aprueba revisión y pasa a Construccion.
reemplazo.aprobar(true);                      // Aprueba construcción y pasa a Finalizado.
reemplazo.aprobar(true);                      // En Finalizado, solo muestra "finalizado".
