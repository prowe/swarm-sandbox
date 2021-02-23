import useSubscriptions, { Subscription } from "./useSubscriptions";

export default function SubscriptionsList() {
    const {subscriptions, removeSubscription} = useSubscriptions();

    return (
        <ul>
            {subscriptions.map((sub: Subscription, idx) =>
                <li key={idx}>
                    <span>{sub.alias}</span>
                    <span>{JSON.stringify(sub.publicKey)}</span>
                    <button onClick={() => removeSubscription(sub)}>Remove</button>
                </li>
            )}
        </ul>
    );
}