import React, { useEffect, useReducer } from 'react';
// import swarm from 'webrtc-swarm';
// import signalhub from 'signalhub';
import { SubscriptionsProvider } from './subscriptions/useSubscriptions';
import SubscriptionsList from './subscriptions/SubscriptionsList';
import AddSubscriptionForm from './subscriptions/AddSubscriptionForm';
import {UserIdentityProvider} from './sign-up/useIdentity';
import SignUp from './sign-up/SignUp';

// const hub = signalhub('swarm-example', [
//   'http://localhost:8080'
// ]);
// const sw = swarm(hub, {
// });

// function messageReducer(messages, newMessage) {
//   const all = [newMessage, ...messages];
//   return all.slice(0, 10);
// }

// export default function App() {
//   const [messages, onMessage] = useReducer(messageReducer, []);

//   useEffect(() => {
//     sw.on('peer', function (peer, id) {
//       console.log('connected to a new peer:', id)
//       console.log('total peers:', sw.peers.length);
//       peer.on('data', data => onMessage(data));
//     })

//     sw.on('disconnect', function (peer, id) {
//       console.log('disconnected from a peer:', id)
//       console.log('total peers:', sw.peers.length)
//     })
//   }, []);

//   function onSubmit(event) {
//     event.preventDefault();
//     const textarea = event.currentTarget.elements.namedItem('message');
//     const message = textarea.value;
//     console.log('submitting', message);
//     sw.peers.forEach(peer => {
//       peer.send(message);
//     });
//     event.currentTarget.reset();
//   }

//   return (
//     <main>
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>

//       <form onSubmit={onSubmit}>
//         <textarea name='message' />

//         <button type='submit'>Send</button>
//       </form>
//     </main>
//   )
// }

export default function App() {
  return (
    <UserIdentityProvider>
      <SubscriptionsProvider>
        <SignUp />

        <SubscriptionsList />
        <AddSubscriptionForm />

      </SubscriptionsProvider>
    </UserIdentityProvider>
  );
}