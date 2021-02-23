import React, { useContext, useMemo, useState } from "react";
import { Dispatch, PropsWithChildren } from "react";

export interface IdentityContext {
    keyPair: CryptoKeyPair;
    setKeyPair: Dispatch<CryptoKeyPair>;
}

const Context = React.createContext<IdentityContext>(undefined);

export function UserIdentityProvider({children}: PropsWithChildren<unknown>) {
    const [keyPair, setKeyPair] = useState<CryptoKeyPair>();

    const value = useMemo<IdentityContext>(() => ({
        keyPair,
        setKeyPair
    }), [keyPair, setKeyPair]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export default function useIdentity(): IdentityContext {
    return useContext(Context);
}