let message = 'Violación de Contrato';

function mustBeFalse(key: boolean) {
    if (isProduction()) return;

    if (key) throw message;
}

function isProduction() {
    return process.env.DEPLOY_AT === 'prod';
}

export const contract = { mustBeFalse };
