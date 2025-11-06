import { MercadoPagoConfig } from 'mercadopago';

const mercadoPagoConfig = (): MercadoPagoConfig | boolean => {
    const MERCADO_PAGO_TOKEN = process.env.MERCADO_PAGO_TOKEN
    if (!MERCADO_PAGO_TOKEN) {
        return false
    }

    const client = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_TOKEN });

    return client
}

export default mercadoPagoConfig