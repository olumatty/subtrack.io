import { useEffect, useState } from "react";
import SubscriptionForm from './Subscriptionform';

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [error, setError] = useState(null); // To handle errors

  // Fetch subscriptions from the backend
  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("https://subscriptiontrack-1.onrender.com/api/subscriptions");
      if (!response.ok) {
        throw new Error("Failed to fetch subscriptions");
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add a new subscription
  const addSubscription = async (subscription) => {
    try {
      const response = await fetch("https://subscriptiontrack-1.onrender.com/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });
      if (!response.ok) {
        throw new Error("Failed to add subscription");
      }
      fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    }
  };

  // Update an existing subscription
  const updateSubscription = async (subscription) => {
    try {
      const response = await fetch(
        `https://subscriptiontrack-1.onrender.com/${editingSubscription._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subscription),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update subscription");
      }
      setEditingSubscription(null);
      fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a subscription
  const deleteSubscription = async (id) => {
    try {
      const response = await fetch(`https://subscriptiontrack-1.onrender.com/api/subscriptions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete subscription");
      }
      fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4 text-blue-600">Subscription Manager</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error if any */}
      {editingSubscription ? (
        <SubscriptionForm
          subscription={editingSubscription}
          onSubmit={updateSubscription}
          onCancel={() => setEditingSubscription(null)}
        />
      ) : (
        <SubscriptionForm onSubmit={addSubscription} />
      )}
      <ul className="list-none mt-4">
        {subscriptions.map((subscription) => (
          <li
            key={subscription._id}
            className="flex justify-between items-center mb-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white"
          >
            <div>
              <h2 className="text-lg font-bold">{subscription.name}</h2>
              <p className="text-gray-700">
                Cost: <span className="font-semibold">${subscription.cost}</span> | Renewal Date:{" "}
                <span className="font-semibold">{new Date(subscription.renewal).toLocaleDateString()}</span> | 
                Category: <span className="font-semibold">{subscription.category}</span>
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  console.log('Clicked Edit for:', subscription);
                  setEditingSubscription(subscription);
                }}
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteSubscription(subscription._id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200 ml-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;
