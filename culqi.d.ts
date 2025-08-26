// culqi.d.ts 
interface Culqi {
 publicKey: string;
 settings: (options: any) => void;
 options: (options: any) => void;
 open: () => void;
 token?: { id: string; };
 error?: any;
 order?: any;
}
declare const Culqi: Culqi;

interface Window {
 culqi: () => void;
}