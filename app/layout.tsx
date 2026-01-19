import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { esES } from "@clerk/localizations";
import './globals.css'
import Script from "next/script";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'ticketsaso',
  description: 'ticketsaso es una plataforma para la gestión de eventos.',
  icons: {
    icon: '/assets/images/logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <head>
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-NP5TSHR7');`,
            }}
          />
          {/* End Google Tag Manager */}
        </head>
        <body className={poppins.variable}>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NP5TSHR7"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          {children}
          {/* --- INICIO: CÓDIGO CULQI --- */}
          {/* 2. Carga el script externo de Culqi */}
          <Script id="culqi-library" src="https://checkout.culqi.com/js/v4" strategy="afterInteractive" />
          {/* 3. Configura la llave pública y prepara la función de callback */}
          <Script id="culqi-configuration" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
              function configureCulqi() {
                if (typeof Culqi !== 'undefined') {
                  Culqi.publicKey = '${process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY}';
                  console.log("Culqi configurado exitosamente.");
                } else {
                  console.warn("El objeto Culqi no está disponible. Reintentando...");
                  setTimeout(configureCulqi, 500); // Reintenta si el script aún no ha cargado
                }
              }

              // Define la función global que será llamada por Culqi
              window.culqi = function() {
                // Dejaremos esta función vacía por ahora.
                // La llenaremos en el siguiente paso.
                console.log("Función culqi() llamada.");
              };

              configureCulqi();
            `,
          }} />
          {/* --- FIN: CÓDIGO CULQI --- */}
        </body>
      </html>
    </ClerkProvider>
  )
}