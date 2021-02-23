import React, { useContext, useMemo } from "react";
import { Dispatch, PropsWithChildren, useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = 'subscriptions';

export interface Subscription {
    alias: string;
    publicKey: JsonWebKey;
}

export interface SubscriptionsContext {
    subscriptions: Subscription[],
    addSubscription: Dispatch<Subscription>;
    removeSubscription: Dispatch<Subscription>;
}

function getSavedSubscriptions(): Subscription[] {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    return value ? JSON.parse(value) : [];
}

const Context = React.createContext<SubscriptionsContext>(undefined);

export function SubscriptionsProvider({children}: PropsWithChildren<unknown>) {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(getSavedSubscriptions);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subscriptions));
    }, [subscriptions]);

    const value = useMemo<SubscriptionsContext>(() => {
        function addSubscription(subscription: Subscription) {
            setSubscriptions((subs: Subscription[]) => [...subs, subscription]);
        }

        function removeSubscription(subscription: Subscription) {
            setSubscriptions((subs: Subscription[]) => subs.filter(s => s !== subscription));
        }

        return {
            subscriptions,
            addSubscription,
            removeSubscription
        };
    }, [subscriptions, setSubscriptions]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export default function useSubscriptions(): SubscriptionsContext {
    return useContext(Context);
}