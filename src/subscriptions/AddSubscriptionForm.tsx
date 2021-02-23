import { ChangeEvent, FormEvent } from "react";
import useSubscriptions, { Subscription } from "./useSubscriptions";

export default function AddSubscriptionForm() {
    const {addSubscription} = useSubscriptions();

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const elements = event.currentTarget.elements;
        const alias = (elements.namedItem('alias') as HTMLInputElement).value;
        const keyElement = elements.namedItem('key') as HTMLTextAreaElement;
        const sub: Subscription = {
            alias,
            publicKey: JSON.parse(keyElement.value.trim()) as JsonWebKey
        };
        addSubscription(sub);
    }

    function onTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        try {
            JSON.parse(event.currentTarget.value.trim());
            event.currentTarget.setCustomValidity('');
        } catch (e) {
            event.currentTarget.setCustomValidity(e.message);
        }
        event.currentTarget.reportValidity();
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                Alias:
                <input required name='alias' />
            </label>
            <label>
                JSON Web Key
                <textarea required onChange={onTextAreaChange} name='key' />
            </label>
            <button type='submit'>Subscribe</button>
        </form>
    )
}