<template>
  <google-pay-button
    environment="TEST"
    button-type="buy"
    button-color="black"
    :paymentRequest.prop="paymentRequest"
    @load-payment-data="loadPaymentData"
    @error="onError"
  >
  </google-pay-button>
</template>

<script>
import '@google-pay/button-element';

export default {
  name: 'GooglePay',
  data() {
    return {
      paymentRequest: {
        apiVersion: 2,
        apiVersionMinor: 0,
        emailRequired: true,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              // PAN_ONLY：支付卡  CRYPTOGRAM_3DS：以3D安全密文进行身份验证的设备令牌
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: [
                'AMEX',
                'DISCOVER',
                'INTERAC',
                'JCB',
                'MASTERCARD',
                'VISA',
              ],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: 'BCR2DN4TVHHP34B7',
          merchantName: 'Test shop',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: '100.00',
          currencyCode: 'USD',
          countryCode: 'US',
        },
      },
    };
  },
  methods: {
    // Your methods go here
  },
  created() {
    // Code to run when the component is created
  },
  mounted() {},
  methods: {
    /**
     * @description: 支付数据加载
     * @param {*} event
     * @return {*}
     */
    loadPaymentData(event) {
      console.log('event', event);
      console.log('load payment data', event.detail);
      console.error('user email', event.email);
    },

    /**
     * @description: 支付报错
     * @param {*} event
     * @return {*}
     */
    onError(event) {
      console.error('errorEvent', event.error);
    },
  },
};
</script>

<style scoped></style>
