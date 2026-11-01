// WORKAROUND PER EXPO GO OBSOLETO (MOCK NATIVO EXPOCRYPTOAES)
// Questo file deve essere importato come PRIMA RIGA in app/_layout.tsx.
// Intercetta il caricamento dei moduli nativi di Expo e inietta un mock
// per ExpoCryptoAES se non presente sul dispositivo.
try {
  const expoModulesCore = require('expo-modules-core');
  if (expoModulesCore && expoModulesCore.requireNativeModule) {
    const originalRequire = expoModulesCore.requireNativeModule;
    expoModulesCore.requireNativeModule = function (name: string) {
      try {
        return originalRequire(name);
      } catch (err) {
        if (name === 'ExpoCryptoAES') {
          console.warn('[Etymo Auth] Modulo nativo ExpoCryptoAES non trovato su questo dispositivo. Applicato mock di sicurezza per prevenire il crash all\'avvio.');
          return {
            encrypt: () => '',
            decrypt: () => '',
            encryptAsync: async () => '',
            decryptAsync: async () => '',
          };
        }
        throw err;
      }
    };
  }
} catch (e) {
  // Silenzioso
}
