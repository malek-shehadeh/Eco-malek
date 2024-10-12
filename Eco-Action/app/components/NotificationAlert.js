// // "use client";

// // import React from "react";
// // import { useNotification } from "../context/NotificationContext";

// // const NotificationAlert = () => {
// //   const { notification, dismissNotification } = useNotification();

// //   if (!notification) return null;

// //   return (
// //     <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 z-50">
// //       <div className="container mx-auto flex justify-between items-center">
// //         <div>
// //           <h3 className="font-bold">{notification.title}</h3>
// //           <p>{notification.message}</p>
// //         </div>
// //         <button
// //           onClick={() => dismissNotification(notification._id)}
// //           className="bg-white text-blue-500 px-2 py-1 rounded"
// //         >
// //           ✕
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NotificationAlert;
// //////////////////////////////////////
// "use client";

// import React from "react";
// import { useNotification } from "../context/NotificationContext";

// const NotificationAlert = () => {
//   const { notification, dismissNotification } = useNotification();

//   console.log("Current notification:", notification); // Add this line

//   if (!notification) return null;

//   return (
//     <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         <div>
//           <h3 className="font-bold">{notification.title}</h3>
//           <p>{notification.message}</p>
//         </div>
//         <button
//           onClick={() => dismissNotification(notification._id)}
//           className="bg-white text-blue-500 px-2 py-1 rounded"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NotificationAlert;
////////////////////////////
// //////////////
// "use client";

// import React from "react";
// import { useNotification } from "../context/NotificationContext";

// const NotificationAlert = () => {
//   const { notification, dismissNotification } = useNotification();

//   console.log("Current notification:", notification);

//   if (!notification || !notification.challenge) return null;

//   return (
//     <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         <div>
//           <h3 className="font-bold">New Challenge</h3>
//           <p>{notification.challenge.title}</p>
//         </div>
//         <button
//           onClick={() => dismissNotification(notification._id)}
//           className="bg-white text-blue-500 px-2 py-1 rounded"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NotificationAlert;
///////////////////

// "use client";

// import React from "react";
// import { useNotification } from "../context/NotificationContext";

// const NotificationAlert = () => {
//   const { notification, dismissNotification } = useNotification();

//   console.log("Current notification:", notification);

//   if (!notification || !notification.challenge) return null;

//   return (
//     <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         <div>
//           <h3 className="font-bold">New Challenge</h3>
//           <p>{notification.challenge.title}</p>
//         </div>
//         <button
//           onClick={() => dismissNotification(notification._id)}
//           className="bg-white text-blue-500 px-2 py-1 rounded"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NotificationAlert;
////////////
////////////
// /////toptop//////
// "use client";

// import React from "react";
// import { useNotification } from "../context/NotificationContext";

// const NotificationAlert = () => {
//   const { notification, dismissNotification } = useNotification();

//   console.log("Current notification:", notification);

//   if (!notification || !notification.challenge) return null;

//   return (
//     <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         <div>
//           <h3 className="font-bold">New Challenge</h3>
//           <p>{notification.challenge.title}</p>
//         </div>
//         <button
//           onClick={dismissNotification}
//           className="bg-white text-blue-500 px-2 py-1 rounded"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NotificationAlert;
////////////////////////////////////////////
"use client";

import React, { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext";

const NotificationAlert = () => {
  const { notification, dismissNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
    }
  }, [notification]);

  if (!notification || !notification.challenge) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      dismissNotification();
    }, 300); // Delay to allow animation to complete
  };

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
      style={{ maxWidth: "90%", width: "400px" }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-sm">New Challenge</h3>
          <p className="text-xs mt-1">{notification.challenge.title}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="bg-white text-blue-500 px-2 py-1 rounded-full text-xs hover:bg-blue-100 transition-colors duration-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NotificationAlert;
