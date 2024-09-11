const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');

admin.initializeApp();

exports.confirmacionPayU = functions.https.onRequest((req, res) => {
    const { reference_sale, state_pol, value, currency, sign } = req.body;

    const apiKey = '4Vj8eK4rloUd272L48hsrarnUA';  // Tu API Key de PayU
    const merchantId = '508029';
    const amount = value;
    const currencyType = currency;
    const transactionState = state_pol;

    const firmaString = `${apiKey}~${merchantId}~${reference_sale}~${amount}~${currencyType}~${transactionState}`;
    const expectedSignature = crypto.createHash('md5').update(firmaString).digest('hex');

    if (sign !== expectedSignature) {
        return res.status(400).send('Firma no válida');
    }

    const transactionRef = admin.firestore().collection('transacciones').doc(reference_sale);
    
    transactionRef.update({
        estado: transactionState === '4' ? 'Aprobado' : 'Rechazado',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
        return res.status(200).send({ estado: transactionState === '4' ? 'APROBADO' : 'RECHAZADO' });
    }).catch(error => {
        return res.status(500).send('Error interno');
    });
});
