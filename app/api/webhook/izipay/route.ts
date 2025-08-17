import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrder } from '@/lib/actions/order.actions';
import { CreateOrderParams } from '@/types';

export async function POST(req: Request) {
  console.log('Webhook de IziPay recibido.');

  const formData = await req.formData();
  const params: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    if (key === 'kr-answer') {
      const izipayData = JSON.parse(value.toString());
      for (const vads_key in izipayData) {
        params[vads_key] = izipayData[vads_key];
      }
    } else {
        params[key] = value;
    }
  });

  const receivedSignature = params.signature;
  if (!receivedSignature) {
    console.error('Error de Webhook: Firma no encontrada en la respuesta.');
    return NextResponse.json({ message: 'Firma no encontrada.' }, { status: 400 });
  }

  const secretKey = process.env.IZIPAY_TEST_SECRET_KEY!;

  // Lista definitiva y ordenada de campos para la firma del webhook de Izipay.
  const signature_fields = [
    'vads_action_mode',
    'vads_acquirer_network',
    'vads_amount',
    'vads_archival_reference_id',
    'vads_auth_mode',
    'vads_auth_number',
    'vads_auth_result',
    'vads_bank_label',
    'vads_bank_product',
    'vads_capture_delay',
    'vads_card_brand',
    'vads_card_country',
    'vads_card_nature',
    'vads_card_number',
    'vads_card_product_category',
    'vads_cardholder_card_expiry_month',
    'vads_cardholder_card_expiry_year',
    'vads_cardholder_card_number',
    'vads_contract_used',
    'vads_ctx_mode',
    'vads_currency',
    'vads_cust_email',
    'vads_cust_id',
    'vads_effective_amount',
    'vads_effective_creation_date',
    'vads_effective_currency',
    'vads_expiry_month',
    'vads_expiry_year',
    'vads_ext_trans_id',
    'vads_extra_result',
    'vads_hash',
    'vads_language',
    'vads_occurrence_type',
    'vads_operation_type',
    'vads_order_id',
    'vads_page_action',
    'vads_pays_ip',
    'vads_payment_certificate',
    'vads_payment_config',
    'vads_payment_option_code',
    'vads_payment_src',
    'vads_presentation_date',
    'vads_result',
    'vads_risk_analysis_result',
    'vads_sequence_number',
    'vads_site_id',
    'vads_threeds_auth_type',
    'vads_threeds_cavv',
    'vads_threeds_cavvAlgorithm',
    'vads_threeds_eci',
    'vads_threeds_enrolled',
    'vads_threeds_error_code',
    'vads_threeds_exit_status',
    'vads_threeds_sign_valid',
    'vads_threeds_status',
    'vads_threeds_user_interaction',
    'vads_threeds_xid',
    'vads_trans_date',
    'vads_trans_id',
    'vads_trans_status',
    'vads_trans_uuid',
    'vads_url_check_src',
    'vads_validation_mode',
    'vads_version',
    'vads_warranty_result'
  ];

  const string_to_sign = signature_fields
    .map(key => {
      const value = params[key];
      if (value === undefined || value === null) {
        console.error(`Error de firma: El campo requerido '${key}' no fue encontrado en el webhook.`);
        throw new Error(`Campo requerido para la firma ausente: ${key}`);
      }
      return String(value);
    })
    .join('+');

  const data_to_hash = string_to_sign + '+' + secretKey;

  const local_signature = crypto
    .createHmac('sha256', secretKey)
    .update(data_to_hash)
    .digest('base64');

  if (receivedSignature !== local_signature) {
    console.error('FIRMA INVÁLIDA. La verificación del webhook ha fallado.');
    console.log("Firma Recibida:", receivedSignature);
    console.log("Firma Calculada:", local_signature);
    return NextResponse.json({ message: 'Firma inválida' }, { status: 400 });
  }

  console.log('Firma verificada exitosamente!');

  try {
    const newOrder: CreateOrderParams = {
      stripeId: params.vads_trans_id, // Usando el ID de transacción de IziPay
      eventId: params.vads_order_id,
      buyerId: params.vads_cust_id,
      totalAmount: String(Number(params.vads_amount) / 100),
      createdAt: new Date(params.vads_presentation_date),
      quantity: 1, // Placeholder: Este dato no viene en la respuesta de IziPay
    };

    const createdOrder = await createOrder(newOrder);

    return NextResponse.json({ message: 'OK', order: createdOrder }, { status: 200 });

  } catch (error) {
    console.error("Error al crear la orden desde el webhook de IziPay:", error);
    return NextResponse.json({ message: 'Error interno del servidor al crear la orden' }, { status: 500 });
  }
}
