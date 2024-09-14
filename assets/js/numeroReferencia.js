import { getUltimaReferencia, incrementarUltimaRef } from './firebase.js';

const getUltRef = await getUltimaReferencia();

const ultimaReferencia = getUltRef.data().referencia;

const ultRefIncrementada = Number(ultimaReferencia) + 1;

await incrementarUltimaRef({referencia: ultRefIncrementada});

export {ultRefIncrementada}
