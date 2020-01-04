export const salva_latitude = (texto) => {
    return {
        type: 'salva_latitude',
        payload: texto
    }
}

export const salva_longitude = (texto) => {
    return {
        type: 'salva_longitude',
        payload: texto
    }
}

export const nome_local = (texto) => {
    return {
        type: 'nome_local',
        payload: texto
    }
}

export const nome_blaster = (texto) => {
    return {
        type: 'nome_blaster',
        payload: texto
    }
}

export const uid_usuario = (texto) => {
    return {
        type: 'uid_usuario',
        payload: texto
    }
}