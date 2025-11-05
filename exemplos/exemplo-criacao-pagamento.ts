import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });
const preference = new Preference(client);
const result = await preference.create({
    body: {
        items: [
            {
                id: '1234',
                title: 'Meu produto',
                quantity: 1,
                unit_price: 2000
            }
        ],
        external_reference: "codigo unico seu",
        back_urls: {
            success: 'http://localhost:3000/success',
            failure: 'http://localhost:3000/failure',
            pending: 'http://localhost:3000/pending'
        }
    }
})

//url gerada 
result.init_point