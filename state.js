var Reemplazo = /** @class */ (function () {
    function Reemplazo() {
        this.aprobado = false; // Inicializa aprobado como falso.
        this.state = new Diseno(); // El state inicial es Diseno.
        console.log(this, "state_inicial");
    }
    Object.defineProperty(Reemplazo.prototype, "getState", {
        get: function () {
            return this.state; // Retorna el state actual.
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Reemplazo.prototype, "setState", {
        set: function (state) {
            this.state = state; // Cambia el state actual.
        },
        enumerable: false,
        configurable: true
    });
    Reemplazo.prototype.aprobar = function (aprobado) {
        return this.state.aprobar(this, aprobado); // Ejecuta la acción aprobar según el state actual.
    };
    return Reemplazo;
}());
var Diseno = /** @class */ (function () {
    function Diseno() {
    }
    Diseno.prototype.aprobar = function (reemplazo, aprobado) {
        reemplazo.aprobado = aprobado; // Actualiza aprobado.
        if (aprobado) {
            reemplazo.setState = new Revision(); // Si aprueba, pasa a state Revision.
            console.log(reemplazo, "diseno_aprobado");
        }
        if (!aprobado) {
            console.log(reemplazo, "diseno_no_aprobado");
        }
    };
    return Diseno;
}());
var Revision = /** @class */ (function () {
    function Revision() {
    }
    Revision.prototype.aprobar = function (reemplazo, aprobado) {
        reemplazo.aprobado = aprobado; // Actualiza aprobado.
        if (aprobado) {
            reemplazo.setState = new Construccion(); // Si aprueba, pasa a Construccion.
            console.log(reemplazo, "revision_aprobada");
        }
        if (!aprobado) {
            reemplazo.setState = new Diseno(); // Si no aprueba, vuelve a Diseno.
            console.log(reemplazo, "revision_no_aprobada_vuelve_a_diseno");
        }
    };
    return Revision;
}());
var Construccion = /** @class */ (function () {
    function Construccion() {
    }
    Construccion.prototype.aprobar = function (reemplazo, aprobado) {
        reemplazo.aprobado = aprobado; // Actualiza aprobado.
        if (aprobado) {
            reemplazo.setState = new Finalizado(); // Si aprueba, pasa a Finalizado.
            console.log(reemplazo, "construccion_aprobada");
        }
    };
    return Construccion;
}());
var Finalizado = /** @class */ (function () {
    function Finalizado() {
    }
    Finalizado.prototype.aprobar = function (reemplazo, aprobado) {
        console.log(reemplazo, "finalizado"); // Ya finalizado, solo muestra el state.
    };
    return Finalizado;
}());
var reemplazo = new Reemplazo(); // Crea una instancia nueva (state Diseno).
reemplazo.aprobar(true); // Aprueba diseño y pasa a Revision.
reemplazo.aprobar(true); // Aprueba revisión y pasa a Construccion.
reemplazo.aprobar(true); // Aprueba construcción y pasa a Finalizado.
reemplazo.aprobar(true); // En Finalizado, solo muestra "finalizado".
