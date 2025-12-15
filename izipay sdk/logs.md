MIRA yo lo veo igual que antes sin los logs,pero quisaz vea mal:, esto sale en consola:
DEBUG: 1. Iniciando initializeIzipayForm...
D:\Proyectos\TicketiHub\components\shared\IzipaySDKForm.tsx:113 DEBUG: 2. Obteniendo token de sesión...
D:\Proyectos\TicketiHub\components\shared\IzipaySDKForm.tsx:72 DEBUG: Iniciando prepareOrderAndGetToken...
D:\Proyectos\TicketiHub\components\shared\IzipaySDKForm.tsx:92 DEBUG: Orden preparada exitosamente. {sessionToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFud…xMDJ9.ycUqv3SWe6K3Cd5TEHp-OkeXreB-d8Qxp1-BQw8-MPw', izipayTransactionId: 'TXN693e2bb513e1', orderNumber: 'TXN693e2bb513e1'}
D:\Proyectos\TicketiHub\components\shared\IzipaySDKForm.tsx:120 DEBUG: 3. Token de sesión obtenido: {sessionToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFud…xMDJ9.ycUqv3SWe6K3Cd5TEHp-OkeXreB-d8Qxp1-BQw8-MPw', orderNumber: 'TXN693e2bb513e1', izipayTransactionId: 'TXN693e2bb513e1'}
D:\Proyectos\TicketiHub\components\shared\IzipaySDKForm.tsx:165 DEBUG: 4. Configuración de Izipay preparada: {
  "publicKey": "VErethUtraQuxas57wuMuquprADrAHAb",
  "config": {
    "transactionId": "TXN693e2bb513e1",
    "action": "pay",
    "merchantCode": "4004353",
    "order": {
      "orderNumber": "TXN693e2bb513e1",
      "currency": "PEN",
      "amount": "10.00",
      "payMethod": "CARD,QR,YAPE_CODE,PAGO_PUSH",
      "processType": "AT",
      "merchantBuyerId": "68a60817c09d7874c01a31d8",
      "dateTimeTransaction": "1765682102330000"
    },
    "card": {
      "brand": "",
      "pan": ""
    },
    "billing": {
      "firstName": "juane",
      "lastName": "in",
      "email": "juanein760@gmail.com",
      "phoneNumber": "957846321",
      "street": "av tu casa 12",
      "city": "Lima",
      "state": "Lima",
      "country": "PE",
      "postalCode": "00001",
      "document": "87456321",
      "documentType": "DNI"
    },
    "render": {
      "typeForm": "pop-up",
      "container": "#izipay-payment-form"
    },
    "appearance": {
      "logo": "https://demo-izipay.azureedge.net/test/img/millasb.svg"
    }
  }
}
D:\Proyectos\TicketiHub\components\shared\IzipaySDKForm.tsx:192 DEBUG: 5. Llamando a izi.LoadForm()...
main.a4de25d3.js:2 🚀 [izi-checkout] Running on branch: DEV-BOT-2631-MaquetacionUIWalletdeTarjetas
main.a4de25d3.js:2 🚀 [izi-checkout] Running on branch: DEV-BOT-2631-MaquetacionUIWalletdeTarjetas
demo-izipay.azureedge.net/test/img/millasb.svg:1   GET https://demo-izipay.azureedge.net/test/img/millasb.svg net::ERR_NAME_NOT_RESOLVED
Image
x @ main.a4de25d3.js:2
ss @ main.a4de25d3.js:2
Oc @ main.a4de25d3.js:2
Ic @ main.a4de25d3.js:2
Tc @ main.a4de25d3.js:2
kc @ main.a4de25d3.js:2
bc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Zo @ main.a4de25d3.js:2
Ko @ main.a4de25d3.js:2
hc @ main.a4de25d3.js:2
Ia @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
setTimeout
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
F @ main.a4de25d3.js:2
x.port1.onmessage @ main.a4de25d3.js:2
js?id=G-323K7RKFPS:440 
    ____                   _        _____
   / ___| ___   ___   __ _| | ___  |_   _|_ _  __ _
  | |  _ / _ \ / _ \ / _` | |/ _ \   | |/ _` |/ _` |
  | |_| | (_) | (_) | (_| | |  __/   | | (_| | (_| |
   \____|\___/ \___/ \__, |_|\___|   |_|\__,_|\__, |
                     |___/                    |___/

js?id=G-323K7RKFPS:440 Processing commands (5)
js?id=G-323K7RKFPS:440 Processing data layer push: {event: "gtm.init_consent", gtm.uniqueEventId: 1}
js?id=G-323K7RKFPS:440 Processing data layer push: {event: "gtm.init", gtm.uniqueEventId: 2}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ogt_1p_data_v2", priority: 13, vtp_isAutoEnabled: true, vtp_autoCollectExclusionSelectors: ["list", ["map", "exclusionSelector", ""]], vtp_isEnabled: true, vtp_cityType: "CSS_SELECTOR", vtp_manualEmailEnabled: false, vtp_firstNameType: "CSS_SELECTOR", vtp_countryType: "CSS_SELECTOR", vtp_cityValue: "", vtp_emailType: "CSS_SELECTOR", vtp_regionType: "CSS_SELECTOR", vtp_autoEmailEnabled: true, vtp_postalCodeValue: "", vtp_lastNameValue: "", vtp_phoneType: "CSS_SELECTOR", vtp_phoneValue: "", vtp_streetType: "CSS_SELECTOR", vtp_autoPhoneEnabled: false, vtp_postalCodeType: "CSS_SELECTOR", vtp_emailValue: "", vtp_firstNameValue: "", vtp_streetValue: "", vtp_lastNameType: "CSS_SELECTOR", vtp_autoAddressEnabled: false, vtp_regionValue: "", vtp_countryValue: "", vtp_isAutoCollectPiiEnabledFlag: false, tag_id: 4}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_ga_first", priority: 12, vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 18}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__set_product_settings", priority: 11, vtp_instanceDestinationId: "G-323K7RKFPS", vtp_foreignTldMacroResult: ["macro", 1], vtp_isChinaVipRegionMacroResult: ["macro", 2], tag_id: 17}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_ga_regscope", priority: 10, vtp_settingsTable: ["list", ["map", "redactFieldGroup", "DEVICE_AND_GEO", "disallowAllRegions", false, "disallowedRegions", ""], ["map", "redactFieldGroup", "GOOGLE_SIGNALS", "disallowAllRegions", true, "disallowedRegions", ""]], vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 16}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_em_download", priority: 9, vtp_includeParams: true, vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 15}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_em_form", priority: 8, vtp_includeParams: true, vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 14}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_em_outbound_click", priority: 7, vtp_includeParams: true, vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 13}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_em_page_view", priority: 6, vtp_historyEvents: true, vtp_includeParams: true, vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 12}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_em_scroll", priority: 5, vtp_includeParams: true, vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 11}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_em_site_search", priority: 4, vtp_searchQueryParams: "q,s,search,query,keyword", vtp_includeParams: true, vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 10}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_em_video", priority: 3, vtp_includeParams: true, vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 9}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_conversion_marking", priority: 2, vtp_conversionRules: ["list", ["map", "matchingRules", "{"type":5,"args":[{"stringValue":"purchase"},{"contextValue":{"namespaceType":1,"keyParts":["eventName"]}}]}"]], vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 8}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_auto_redact", priority: 1, vtp_redactEmail: true, vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 7}
js?id=G-323K7RKFPS:440 Tag fired: {function: "__ccd_ga_last", priority: 0, vtp_instanceDestinationId: "G-323K7RKFPS", tag_id: 6}
js?id=G-323K7RKFPS:440 Processing GTAG command: ["js", Sat Dec 13 2025 22:15:05 GMT-0500 (hora estándar de Colombia)]
js?id=G-323K7RKFPS:440 Tag fired: {function: "__gct", vtp_trackingId: "G-323K7RKFPS", vtp_sessionDuration: 0, tag_id: 1}
js?id=G-323K7RKFPS:440 Processing GTAG command: ["config", "G-323K7RKFPS", {user_id: "juanein760@gmail.com", send_page_view: false}]
js?id=G-323K7RKFPS:440 Generated new client id: 569141762.1765682106
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440 Event processing aborted during augmentation.
js?id=G-323K7RKFPS:440 GTAG Command: "config", target: "G-323K7RKFPS", configuration: {user_id: "juanein760@gmail.com", send_page_view: false}
js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "load", {transactionId: "TXN693e2bb513e1", typeForm: "pop-up", paymentSelectedMethod: "CARD"}]
js?id=G-323K7RKFPS:440 Generated new client id: 810207033.1765682106
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
BC @ js?id=G-323K7RKFPS:727
setTimeout
ld @ js?id=G-323K7RKFPS:220
CC @ js?id=G-323K7RKFPS:730
tn @ js?id=G-323K7RKFPS:1017
(anonymous) @ js?id=G-323K7RKFPS:1021
c @ js?id=G-323K7RKFPS:1020
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1023
js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
jO @ js?id=G-323K7RKFPS:873
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
BC @ js?id=G-323K7RKFPS:727
setTimeout
ld @ js?id=G-323K7RKFPS:220
CC @ js?id=G-323K7RKFPS:730
tn @ js?id=G-323K7RKFPS:1017
(anonymous) @ js?id=G-323K7RKFPS:1021
c @ js?id=G-323K7RKFPS:1020
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1023
js?id=G-323K7RKFPS:440 Event processing aborted during storage.
js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "IZIPAY_EVENT_LOADED", {transactionId: "TXN693e2bb513e1", merchantCode: "4004353", action: "pay", merchantName: "PRUEBAS 3DS", merchant_mcc: "6012", typePlatform: "WEB", useCustomFields: false, order_orderNumber: "TXN693e2bb513e1", order_amount: 10, order_currency: "PEN", order_payMethod: "CARD,QR,YAPE_CODE,PAGO_PUSH", order_processType: "AT", billing_documentType: "DNI", config_controlMultilanguage: false, config_typeForm: "pop-up", config_showButton: true, config_styleInput: "normal", config_hideGlobalErrors: true, config_buttonText: "Pagar", eventCountValue: 1}]
js?id=G-323K7RKFPS:440 Generated new client id: 561040500.1765682106
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
BC @ js?id=G-323K7RKFPS:727
setTimeout
ld @ js?id=G-323K7RKFPS:220
CC @ js?id=G-323K7RKFPS:730
tn @ js?id=G-323K7RKFPS:1017
(anonymous) @ js?id=G-323K7RKFPS:1021
c @ js?id=G-323K7RKFPS:1020
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1023
js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
jO @ js?id=G-323K7RKFPS:873
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
BC @ js?id=G-323K7RKFPS:727
setTimeout
ld @ js?id=G-323K7RKFPS:220
CC @ js?id=G-323K7RKFPS:730
tn @ js?id=G-323K7RKFPS:1017
(anonymous) @ js?id=G-323K7RKFPS:1021
c @ js?id=G-323K7RKFPS:1020
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1023
js?id=G-323K7RKFPS:440 Event processing aborted during storage.
js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "page_view", {page_title: "Checkout izipay", page_location: "/checkout"}]
js?id=G-323K7RKFPS:440 Generated new client id: 1917709766.1765682106
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
BC @ js?id=G-323K7RKFPS:727
setTimeout
ld @ js?id=G-323K7RKFPS:220
CC @ js?id=G-323K7RKFPS:730
tn @ js?id=G-323K7RKFPS:1017
(anonymous) @ js?id=G-323K7RKFPS:1021
c @ js?id=G-323K7RKFPS:1020
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1023
js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
jO @ js?id=G-323K7RKFPS:873
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
BC @ js?id=G-323K7RKFPS:727
setTimeout
ld @ js?id=G-323K7RKFPS:220
CC @ js?id=G-323K7RKFPS:730
tn @ js?id=G-323K7RKFPS:1017
(anonymous) @ js?id=G-323K7RKFPS:1021
c @ js?id=G-323K7RKFPS:1020
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1023
js?id=G-323K7RKFPS:440 Event processing aborted during storage.
js?id=G-323K7RKFPS:440 Processing commands (1)
js?id=G-323K7RKFPS:440 Processing data layer push: {event: "gtm.dom"}
js?id=G-323K7RKFPS:440 Processing commands (1)
js?id=G-323K7RKFPS:440 Processing data layer push: {event: "gtm.load"}
js?id=G-323K7RKFPS:440 Processing commands (1)
js?id=G-323K7RKFPS:440 Processing data layer push: {event: "gtm.scrollDepth", gtm.scrollThreshold: 90, gtm.scrollUnits: "percent", gtm.scrollDirection: "vertical", gtm.triggers: "7"}
js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "scroll", {percent_scrolled: 90, send_to: "G-323K7RKFPS"}]
js?id=G-323K7RKFPS:440 Generated new client id: 1088177447.1765682106
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
CC.b.push @ js?id=G-323K7RKFPS:730
uC @ js?id=G-323K7RKFPS:731
DC @ js?id=G-323K7RKFPS:731
sJ @ js?id=G-323K7RKFPS:834
nJ @ js?id=G-323K7RKFPS:833
(anonymous) @ js?id=G-323K7RKFPS:837
setTimeout
ld @ js?id=G-323K7RKFPS:220
vJ @ js?id=G-323K7RKFPS:837
(anonymous) @ js?id=G-323K7RKFPS:315
k.apply @ js?id=G-323K7RKFPS:236
Za @ js?id=G-323K7RKFPS:196
Sd.evaluate @ js?id=G-323K7RKFPS:238
me @ js?id=G-323K7RKFPS:253
k.apply @ js?id=G-323K7RKFPS:236
Za @ js?id=G-323K7RKFPS:196
Wa @ js?id=G-323K7RKFPS:195
(anonymous) @ js?id=G-323K7RKFPS:260
k.apply @ js?id=G-323K7RKFPS:236
Za @ js?id=G-323K7RKFPS:196
k.Np @ js?id=G-323K7RKFPS:198
zf @ js?id=G-323K7RKFPS:271
(anonymous) @ js?id=G-323K7RKFPS:751
Jg @ js?id=G-323K7RKFPS:289
e @ js?id=G-323K7RKFPS:691
kB @ js?id=G-323K7RKFPS:694
oB @ js?id=G-323K7RKFPS:698
zC @ js?id=G-323K7RKFPS:725
BC @ js?id=G-323K7RKFPS:727
setTimeout
ld @ js?id=G-323K7RKFPS:220
CC @ js?id=G-323K7RKFPS:730
tn @ js?id=G-323K7RKFPS:1017
(anonymous) @ js?id=G-323K7RKFPS:1021
c @ js?id=G-323K7RKFPS:1020
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1023
js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
jO @ js?id=G-323K7RKFPS:873
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
CC.b.push @ js?id=G-323K7RKFPS:730
uC @ js?id=G-323K7RKFPS:731
DC @ js?id=G-323K7RKFPS:731
sJ @ js?id=G-323K7RKFPS:834
nJ @ js?id=G-323K7RKFPS:833
(anonymous) @ js?id=G-323K7RKFPS:837
setTimeout
ld @ js?id=G-323K7RKFPS:220
vJ @ js?id=G-323K7RKFPS:837
(anonymous) @ js?id=G-323K7RKFPS:315
k.apply @ js?id=G-323K7RKFPS:236
Za @ js?id=G-323K7RKFPS:196
Sd.evaluate @ js?id=G-323K7RKFPS:238
me @ js?id=G-323K7RKFPS:253
k.apply @ js?id=G-323K7RKFPS:236
Za @ js?id=G-323K7RKFPS:196
Wa @ js?id=G-323K7RKFPS:195
(anonymous) @ js?id=G-323K7RKFPS:260
k.apply @ js?id=G-323K7RKFPS:236
Za @ js?id=G-323K7RKFPS:196
k.Np @ js?id=G-323K7RKFPS:198
zf @ js?id=G-323K7RKFPS:271
(anonymous) @ js?id=G-323K7RKFPS:751
Jg @ js?id=G-323K7RKFPS:289
e @ js?id=G-323K7RKFPS:691
kB @ js?id=G-323K7RKFPS:694
oB @ js?id=G-323K7RKFPS:698
zC @ js?id=G-323K7RKFPS:725
BC @ js?id=G-323K7RKFPS:727
setTimeout
ld @ js?id=G-323K7RKFPS:220
CC @ js?id=G-323K7RKFPS:730
tn @ js?id=G-323K7RKFPS:1017
(anonymous) @ js?id=G-323K7RKFPS:1021
c @ js?id=G-323K7RKFPS:1020
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1021
(anonymous) @ js?id=G-323K7RKFPS:1023
js?id=G-323K7RKFPS:440 Event processing aborted during storage.
js?id=G-323K7RKFPS:440 Processing commands (1)
js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "IZIPAY_EVENT_INIT_PAYMENT", {transactionId: "TXN693e2bb513e1", merchantCode: "4004353", action: "pay", merchantName: "PRUEBAS 3DS", merchant_mcc: "6012", typePlatform: "WEB", useCustomFields: false, order_orderNumber: "TXN693e2bb513e1", order_amount: 10, order_currency: "PEN", order_payMethod: "CARD,QR,YAPE_CODE,PAGO_PUSH", order_processType: "AT", billing_documentType: "DNI", config_controlMultilanguage: false, config_typeForm: "pop-up", config_showButton: true, config_styleInput: "normal", config_hideGlobalErrors: true, config_buttonText: "Pagar", eventCountValue: 1, payMethod: "CARD", checkSaveCard: false}]
js?id=G-323K7RKFPS:440 Generated new client id: 13718629.1765682114
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
CC.b.push @ js?id=G-323K7RKFPS:730
t.w6 @ main.a4de25d3.js:2
j @ main.a4de25d3.js:2
x @ main.a4de25d3.js:2
onSuccessSubmit @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Ue @ main.a4de25d3.js:2
Ke @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
kr @ main.a4de25d3.js:2
Tr @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
je @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Mr @ main.a4de25d3.js:2
Qt @ main.a4de25d3.js:2
Jt @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Ne @ main.a4de25d3.js:2
Zt @ main.a4de25d3.js:2
js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
jO @ js?id=G-323K7RKFPS:873
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
CC.b.push @ js?id=G-323K7RKFPS:730
t.w6 @ main.a4de25d3.js:2
j @ main.a4de25d3.js:2
x @ main.a4de25d3.js:2
onSuccessSubmit @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Ue @ main.a4de25d3.js:2
Ke @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
kr @ main.a4de25d3.js:2
Tr @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
je @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Mr @ main.a4de25d3.js:2
Qt @ main.a4de25d3.js:2
Jt @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Ne @ main.a4de25d3.js:2
Zt @ main.a4de25d3.js:2
js?id=G-323K7RKFPS:440 Event processing aborted during storage.
js?id=G-323K7RKFPS:440 Processing commands (1)
js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "begin_checkout", {currency: "PEN", value: 10, items: [{item_id: "TXN693e2bb513e1", item_name: "pay", item_brand: "CARD", item_category: "87456321", item_category2: "pop-up", price: 10, quantity: 1}]}]
js?id=G-323K7RKFPS:440 Generated new client id: 2141037182.1765682114
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
CC.b.push @ js?id=G-323K7RKFPS:730
t.w6 @ main.a4de25d3.js:2
j @ main.a4de25d3.js:2
x @ main.a4de25d3.js:2
onSuccessSubmit @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Ue @ main.a4de25d3.js:2
Ke @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
kr @ main.a4de25d3.js:2
Tr @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
je @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Mr @ main.a4de25d3.js:2
Qt @ main.a4de25d3.js:2
Jt @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Ne @ main.a4de25d3.js:2
Zt @ main.a4de25d3.js:2
js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
jO @ js?id=G-323K7RKFPS:873
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
CC.b.push @ js?id=G-323K7RKFPS:730
t.w6 @ main.a4de25d3.js:2
j @ main.a4de25d3.js:2
x @ main.a4de25d3.js:2
onSuccessSubmit @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Ue @ main.a4de25d3.js:2
Ke @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
kr @ main.a4de25d3.js:2
Tr @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
je @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Mr @ main.a4de25d3.js:2
Qt @ main.a4de25d3.js:2
Jt @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Ne @ main.a4de25d3.js:2
Zt @ main.a4de25d3.js:2
js?id=G-323K7RKFPS:440 Event processing aborted during storage.
js?id=G-323K7RKFPS:440 Processing commands (2)
js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "form_start", {form_id: "izi-main-form", form_name: null, form_destination: "https://sandbox-checkout.izipay.pe/payments/v1/checkout?mode=pop-up", form_length: 8, first_field_id: undefined, first_field_name: undefined, first_field_type: undefined, first_field_position: undefined, send_to: "G-323K7RKFPS"}]
js?id=G-323K7RKFPS:440 Generated new client id: 1040384898.1765682115
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440 Event processing aborted during augmentation.
js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "form_submit", {form_id: "izi-main-form", form_name: null, form_destination: "https://sandbox-checkout.izipay.pe/payments/v1/checkout?mode=pop-up", form_length: 8, form_submit_text: undefined, event_callback: [function], send_to: "G-323K7RKFPS"}]
js?id=G-323K7RKFPS:440 Generated new client id: 1173141256.1765682115
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440 Event processing aborted during augmentation.
js?id=G-323K7RKFPS:440 Processing commands (0)
sandbox-checkout.izipay.pe/payments/v1/checkout?mode=pop-up:1  Access to fetch at 'https://sandbox-api-pw.izipay.pe/event/v1/Event/Save' from origin 'https://sandbox-checkout.izipay.pe' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
main.a4de25d3.js:2   POST https://sandbox-api-pw.izipay.pe/event/v1/Event/Save net::ERR_FAILED 200 (OK)
Nb @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
setTimeout
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
Me @ main.a4de25d3.js:2
Zt @ main.a4de25d3.js:2
selectionchange
set @ main.a4de25d3.js:2
ne @ main.a4de25d3.js:2
As @ main.a4de25d3.js:2
Nc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Rc @ main.a4de25d3.js:2
bc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Zo @ main.a4de25d3.js:2
Ko @ main.a4de25d3.js:2
hc @ main.a4de25d3.js:2
Ia @ main.a4de25d3.js:2
onSuccessSubmit @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
Promise.then
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Ue @ main.a4de25d3.js:2
Ke @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
kr @ main.a4de25d3.js:2
Tr @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
je @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Mr @ main.a4de25d3.js:2
Qt @ main.a4de25d3.js:2
Jt @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Ne @ main.a4de25d3.js:2
Zt @ main.a4de25d3.js:2
main.a4de25d3.js:2 error--> TypeError: Failed to fetch
    at Nb (main.a4de25d3.js:2:809913)
    at main.a4de25d3.js:2:941862
    at main.a4de25d3.js:2:704523
    at Generator.<anonymous> (main.a4de25d3.js:2:701921)
    at Generator.next (main.a4de25d3.js:2:700697)
    at am (main.a4de25d3.js:2:704868)
    at a (main.a4de25d3.js:2:705072)
    at main.a4de25d3.js:2:705133
    at new Promise (<anonymous>)
    at main.a4de25d3.js:2:705012
js?id=G-323K7RKFPS:440 Processing commands (1)
js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "purchase", {transaction_id: "TXN693e2bb513e1", currency: "PEN", value: 10, items: [{item_id: "TXN693e2bb513e1", item_name: "pay", item_brand: "CARD", item_category: "87456321", item_category2: "pop-up", price: 10, quantity: 1}]}]
js?id=G-323K7RKFPS:440 Generated new client id: 710360705.1765682118
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
CC.b.push @ js?id=G-323K7RKFPS:730
t.w6 @ main.a4de25d3.js:2
j @ main.a4de25d3.js:2
x @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
bc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Zo @ main.a4de25d3.js:2
Ko @ main.a4de25d3.js:2
hc @ main.a4de25d3.js:2
Ia @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
setTimeout
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
bc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Zo @ main.a4de25d3.js:2
Ko @ main.a4de25d3.js:2
hc @ main.a4de25d3.js:2
Ia @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Promise.finally
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
F @ main.a4de25d3.js:2
x.port1.onmessage @ main.a4de25d3.js:2
js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
jO @ js?id=G-323K7RKFPS:873
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
CC.b.push @ js?id=G-323K7RKFPS:730
t.w6 @ main.a4de25d3.js:2
j @ main.a4de25d3.js:2
x @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
bc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Zo @ main.a4de25d3.js:2
Ko @ main.a4de25d3.js:2
hc @ main.a4de25d3.js:2
Ia @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
setTimeout
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
bc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Zo @ main.a4de25d3.js:2
Ko @ main.a4de25d3.js:2
hc @ main.a4de25d3.js:2
Ia @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Promise.finally
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
F @ main.a4de25d3.js:2
x.port1.onmessage @ main.a4de25d3.js:2
js?id=G-323K7RKFPS:440 Event processing aborted during storage.
js?id=G-323K7RKFPS:440 Processing commands (1)
js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "IZIPAY_EVENT_AUTHORIZE", {transactionId: "TXN693e2bb513e1", merchantCode: "4004353", action: "pay", merchantName: "PRUEBAS 3DS", merchant_mcc: "6012", typePlatform: "WEB", useCustomFields: false, order_orderNumber: "TXN693e2bb513e1", order_amount: 10, order_currency: "PEN", order_payMethod: "CARD,QR,YAPE_CODE,PAGO_PUSH", order_processType: "AT", billing_documentType: "DNI", config_controlMultilanguage: false, config_typeForm: "pop-up", config_showButton: true, config_styleInput: "normal", config_hideGlobalErrors: true, config_buttonText: "Pagar", eventCountValue: 1, payMethod: "CARD", response_code: "00", response_message: "Operación exitosa", have3dsChallenge: false, checkSaveCard: false}]
js?id=G-323K7RKFPS:440 Generated new client id: 436623166.1765682118
js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
CC.b.push @ js?id=G-323K7RKFPS:730
t.w6 @ main.a4de25d3.js:2
j @ main.a4de25d3.js:2
x @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
bc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Zo @ main.a4de25d3.js:2
Ko @ main.a4de25d3.js:2
hc @ main.a4de25d3.js:2
Ia @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
setTimeout
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
bc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Zo @ main.a4de25d3.js:2
Ko @ main.a4de25d3.js:2
hc @ main.a4de25d3.js:2
Ia @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Promise.finally
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
F @ main.a4de25d3.js:2
x.port1.onmessage @ main.a4de25d3.js:2
js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ js?id=G-323K7RKFPS:440
gp @ js?id=G-323K7RKFPS:438
jO @ js?id=G-323K7RKFPS:873
NP @ js?id=G-323K7RKFPS:918
k.Sr @ js?id=G-323K7RKFPS:927
(anonymous) @ js?id=G-323K7RKFPS:924
Cm @ js?id=G-323K7RKFPS:401
So @ js?id=G-323K7RKFPS:437
(anonymous) @ js?id=G-323K7RKFPS:924
c @ js?id=G-323K7RKFPS:854
MK @ js?id=G-323K7RKFPS:854
k.Rr @ js?id=G-323K7RKFPS:924
b @ js?id=G-323K7RKFPS:939
v @ js?id=G-323K7RKFPS:466
Lm @ js?id=G-323K7RKFPS:403
cr @ js?id=G-323K7RKFPS:466
br.flush @ js?id=G-323K7RKFPS:471
br.push @ js?id=G-323K7RKFPS:468
Uq @ js?id=G-323K7RKFPS:463
event @ js?id=G-323K7RKFPS:717
zC @ js?id=G-323K7RKFPS:724
CC.b.push @ js?id=G-323K7RKFPS:730
t.w6 @ main.a4de25d3.js:2
j @ main.a4de25d3.js:2
x @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
bc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Zo @ main.a4de25d3.js:2
Ko @ main.a4de25d3.js:2
hc @ main.a4de25d3.js:2
Ia @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
setTimeout
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
bc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
Zo @ main.a4de25d3.js:2
Ko @ main.a4de25d3.js:2
hc @ main.a4de25d3.js:2
Ia @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Promise.finally
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
am @ main.a4de25d3.js:2
a @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
Dc @ main.a4de25d3.js:2
t.unstable_runWithPriority @ main.a4de25d3.js:2
Go @ main.a4de25d3.js:2
jc @ main.a4de25d3.js:2
(anonymous) @ main.a4de25d3.js:2
F @ main.a4de25d3.js:2
x.port1.onmessage @ main.a4de25d3.js:2
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Event processing aborted during storage.
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Processing commands (1)
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "page_view", {page_title: "Operación exitosa", page_location: "/payment-success"}]
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Generated new client id: 1135208679.1765682118
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440
gp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:438
NP @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:918
k.Sr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:927
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
Cm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:401
So @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:437
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
c @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
MK @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
k.Rr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
b @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:939
v @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
Lm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:403
cr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
br.flush @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:471
br.push @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:468
Uq @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:463
event @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:717
zC @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:724
CC.b.push @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:730
t.w6 @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
j @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
x @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
bc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Zo @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ko @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
hc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ia @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
setTimeout
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
bc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Zo @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ko @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
hc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ia @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Promise.finally
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
am @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
a @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
F @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
x.port1.onmessage @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440
gp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:438
jO @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:873
NP @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:918
k.Sr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:927
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
Cm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:401
So @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:437
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
c @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
MK @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
k.Rr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
b @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:939
v @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
Lm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:403
cr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
br.flush @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:471
br.push @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:468
Uq @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:463
event @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:717
zC @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:724
CC.b.push @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:730
t.w6 @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
j @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
x @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
bc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Zo @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ko @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
hc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ia @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
setTimeout
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
bc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Zo @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ko @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
hc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ia @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Promise.finally
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
am @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
a @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
F @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
x.port1.onmessage @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Event processing aborted during storage.
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Processing commands (1)
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Processing data layer push: {event: "gtm.historyChange-v2", gtm.historyChangeSource: "replaceState", gtm.oldUrlFragment: "", gtm.newUrlFragment: "", gtm.oldHistoryState: {key: "p4hwkf", state: {origin: true, queryControllerId: "1765682102341000"}}, gtm.newHistoryState: {key: "d90e6y", state: {}}, gtm.oldUrl: "https://sandbox-checkout.izipay.pe/payments/v1/checkout?mode=pop-up", gtm.newUrl: "https://sandbox-checkout.izipay.pe/payments/v1/payment-success", gtm.triggers: "6"}
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Processing GTAG command: ["event", "page_view", {page_location: "https://sandbox-checkout.izipay.pe/payments/v1/payment-success", page_referrer: "https://sandbox-checkout.izipay.pe/payments/v1/checkout?mode=pop-up", send_to: "G-323K7RKFPS"}]
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Generated new client id: 1954917330.1765682119
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440
gp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:438
NP @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:918
k.Sr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:927
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
Cm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:401
So @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:437
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
c @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
MK @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
k.Rr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
b @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:939
v @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
Lm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:403
cr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
br.flush @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:471
br.push @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:468
Uq @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:463
event @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:717
zC @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:724
CC.b.push @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:730
uC @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:731
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:822
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:821
setTimeout
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:821
g @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:824
c.<computed> @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:822
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
confirmTransitionTo @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
replace @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
success @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
goToAction @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
bc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Zo @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ko @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
hc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ia @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
setTimeout
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
bc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Zo @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ko @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
hc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ia @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Promise.finally
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
am @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
a @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
F @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
x.port1.onmessage @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440
gp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:438
jO @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:873
NP @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:918
k.Sr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:927
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
Cm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:401
So @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:437
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
c @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
MK @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
k.Rr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
b @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:939
v @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
Lm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:403
cr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
br.flush @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:471
br.push @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:468
Uq @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:463
event @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:717
zC @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:724
CC.b.push @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:730
uC @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:731
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:822
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:821
setTimeout
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:821
g @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:824
c.<computed> @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:822
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
confirmTransitionTo @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
replace @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
success @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
goToAction @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
bc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Zo @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ko @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
hc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ia @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
setTimeout
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
bc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Zo @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ko @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
hc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Ia @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Promise.finally
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
am @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
a @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Dc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
t.unstable_runWithPriority @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
Go @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
jc @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
(anonymous) @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
F @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
x.port1.onmessage @ sandbox-checkout.izipay.pe/payments/v1/static/js/main.a4de25d3.js:2
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Event processing aborted during storage.
D:\Proyectos\TicketiHub\components\shared\IzipaySDKForm.tsx:170 --- DEBUG: [INICIO] CALLBACK DE IZIPAY INVOCADO ---
D:\Proyectos\TicketiHub\components\shared\IzipaySDKForm.tsx:171 --- DEBUG: RESPUESTA COMPLETA DE IZIPAY: {
  "code": "00",
  "message": "Operación exitosa",
  "messageUser": "Operación exitosa",
  "messageUserEng": "Successful",
  "response": {
    "payMethod": "CARD",
    "order": [
      {
        "payMethodAuthorization": "CARD",
        "codeAuth": "S28158",
        "currency": "PEN",
        "amount": "10.00",
        "installment": "00",
        "deferred": "0",
        "orderNumber": "TXN693e2bb513e1",
        "stateMessage": "Autorizado",
        "dateTransaction": "20251213",
        "timeTransaction": "221515",
        "uniqueId": "450114425",
        "referenceNumber": "3000000"
      }
    ],
    "card": {
      "brand": "MC",
      "pan": "520474******1127",
      "save": "false"
    },
    "billing": {
      "firstName": "juane",
      "lastName": "in",
      "email": "juanein760@gmail.com",
      "phoneNumber": "957846321",
      "street": "av tu casa 12",
      "city": "Lima",
      "state": "Lima",
      "country": "PE",
      "postalCode": "00001",
      "documentType": "DNI",
      "document": "87456321",
      "companyName": ""
    },
    "merchant": {
      "merchantCode": "4004353",
      "facilitatorCode": ""
    },
    "token": {
      "merchantBuyerId": "",
      "cardToken": "",
      "alias": ""
    },
    "authentication": {
      "result": ""
    },
    "customFields": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    "miles": {
      "netMiles": "",
      "miles": ""
    }
  },
  "payloadHttp": "{\"code\":\"00\",\"message\":\"Operación exitosa\",\"messageUser\":\"Operación exitosa\",\"messageUserEng\":\"Successful\",\"response\":{\"payMethod\":\"CARD\",\"order\":[{\"payMethodAuthorization\":\"CARD\",\"codeAuth\":\"S28158\",\"currency\":\"PEN\",\"amount\":\"10.00\",\"installment\":\"00\",\"deferred\":\"0\",\"orderNumber\":\"TXN693e2bb513e1\",\"stateMessage\":\"Autorizado\",\"dateTransaction\":\"20251213\",\"timeTransaction\":\"221515\",\"uniqueId\":\"450114425\",\"referenceNumber\":\"3000000\"}],\"card\":{\"brand\":\"MC\",\"pan\":\"520474******1127\",\"save\":\"false\"},\"billing\":{\"firstName\":\"juane\",\"lastName\":\"in\",\"email\":\"juanein760@gmail.com\",\"phoneNumber\":\"957846321\",\"street\":\"av tu casa 12\",\"city\":\"Lima\",\"state\":\"Lima\",\"country\":\"PE\",\"postalCode\":\"00001\",\"documentType\":\"DNI\",\"document\":\"87456321\",\"companyName\":\"\"},\"merchant\":{\"merchantCode\":\"4004353\",\"facilitatorCode\":\"\"},\"token\":{\"merchantBuyerId\":\"\",\"cardToken\":\"\",\"alias\":\"\"},\"authentication\":{\"result\":\"\"},\"customFields\":[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],\"miles\":{\"netMiles\":\"\",\"miles\":\"\"}},\"transactionId\":\"TXN693e2bb513e1\"}",
  "signature": "Qo4i03SF7uhUp3nR7INNTh8W8SrF3czR7W5j4cceS50=",
  "transactionId": "TXN693e2bb513e1"
}
D:\Proyectos\TicketiHub\components\shared\IzipaySDKForm.tsx:177 --- DEBUG: ¡PAGO EXITOSO! Código: 00, TransactionID: TXN693e2bb513e1. Redirigiendo...
D:\Proyectos\TicketiHub\components\shared\IzipaySDKForm.tsx:188 --- DEBUG: [FIN] CALLBACK DE IZIPAY ---
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Generated new client id: 1145751795.1765682124
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 No session cookie found. Generating fresh session object.
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440  Unable to update session cookie.
fp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440
gp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:438
NP @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:918
k.Sr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:927
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
Cm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:401
So @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:437
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
c @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
MK @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
k.Rr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
b @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:939
v @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
Lm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:403
cr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
br.flush @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:471
br.push @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:468
Uq @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:463
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:940
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:876
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:875
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440  Unable to set cookie.
fp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440
gp @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:438
jO @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:873
NP @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:918
k.Sr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:927
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
Cm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:401
So @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:437
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
c @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
MK @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:854
k.Rr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:924
b @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:939
v @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
Lm @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:403
cr @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:466
br.flush @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:471
br.push @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:468
Uq @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:463
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:940
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:876
(anonymous) @ www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:875
www.googletagmanager.com/gtag/js?id=G-323K7RKFPS:440 Event processing aborted during storage.

esto sale en terminal:
GET /events/693346eff907843ce632e925 200 in 712ms
 GET /events/693346eff907843ce632e925/checkout 200 in 323ms

--- PRUEBA DE DIAGNÓSTICO ---
DEBUG: ID generado y guardado en BD (NUESTRO_ID): TXN693e2bb513e1
-----------------------------

--- Izipay API Call Trace ---
Request Body: {
  "requestSource": "ECOMMERCE",
  "merchantCode": "4004353",
  "orderNumber": "TXN693e2bb513e1",
  "publicKey": "VErethUtraQuxas57wuMuquprADrAHAb",
  "amount": "10.00"
}
Response Status Code: 200
Response Body: {"code":"00","message":"OK","response":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudENvZGUiOiI0MDA0MzUzIiwiZmFjaWxpdGF0b3JDb2RlIjoiMCIsInRyYW5zYWN0aW9uSWQiOiJUWE42OTNlMmJiNTEzZTEiLCJPcmRlck51bWJlciI6IlRYTjY5M2UyYmI1MTNlMSIsIkFtb3VudCI6IjEwLjAwIiwiVG9rZW5JZCI6IjRkMmExZDUyLWIzZTItNGRiZi1hOGNiLWY2Njk0ZGIwYjkxYSIsIm5iZiI6MTc2NTY4MjEwMiwiZXhwIjoxNzY1NjgzMDAyLCJpYXQiOjE3NjU2ODIxMDJ9.ycUqv3SWe6K3Cd5TEHp-OkeXreB-d8Qxp1-BQw8-MPw","userOrg":"1snn5n9w","userScoring":"izipay_low"}}
-----------------------------
 POST /api/prepare-order 200 in 1363ms


