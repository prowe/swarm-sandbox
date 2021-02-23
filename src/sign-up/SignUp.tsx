import { useEffect, useState } from "react";
import useIdentity from "./useIdentity";

export default function SignUp() {
    const {keyPair, setKeyPair} = useIdentity();
    const [jsonWebKey, setJsonWebKey] = useState<JsonWebKey>();
    useEffect(() => {
        if (keyPair) {
            crypto.subtle.exportKey('jwk', keyPair.publicKey)
                .then(setJsonWebKey);
        } else {
            setJsonWebKey(undefined);
        }
    }, [keyPair]);

    async function newKeySignup() {
        const keyParams: RsaHashedKeyGenParams = {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        };
        const kp = await crypto.subtle.generateKey(keyParams, true, ["sign", "verify"]) as CryptoKeyPair;
        setKeyPair(kp);
    }

    return (
        <section>
            {jsonWebKey && <div>
                Your public key:
                <pre>
                    {JSON.stringify(jsonWebKey, null, 2)}
                </pre>
            </div>}

            <button onClick={newKeySignup}>Create New Key</button>
        </section>
    );
}
