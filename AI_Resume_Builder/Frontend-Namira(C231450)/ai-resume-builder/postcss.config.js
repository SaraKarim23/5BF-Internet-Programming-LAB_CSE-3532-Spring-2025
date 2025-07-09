// module.exports = {
//   plugins: {
//     "@tailwindcss/postcss": {}, // Add this line
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };

// export default {
//   plugins: {
//     "@tailwindcss/postcss": {},
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwindcss(), autoprefixer()],
};


