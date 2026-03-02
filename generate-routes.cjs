const fs = require('fs');
const path = require('path');

// 1. Point this to your React pages folder
const pagesDir = path.resolve(__dirname, 'src/pages');

function getRoutes(dir, baseRoute = '') {
  let routes = [];
  
  // Safety check: ensure directory exists
  if (!fs.existsSync(dir)) return routes;

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      routes = routes.concat(getRoutes(filePath, `${baseRoute}/${file}`));
    } else {
      // 1. Remove file extension
      let routeName = file.replace(/\.(jsx|tsx|js|ts)$/, '');
      
      // 2. JUNK FILTER: Ignore backup, bad, or temporary files
      const isJunk = /BKUP|BAD|OLD|Recent|HomePage\d/i.test(routeName);
      if (isJunk) return;

      // 3. CLEAN ROUTING: Handle index and homepage as root '/'
      const isRoot = routeName.toLowerCase() === 'index' || routeName.toLowerCase() === 'homepage';
      
      if (isRoot) {
        routes.push(baseRoute === '' ? '/' : baseRoute.toLowerCase());
      } else {
        // 4. CASE SENSITIVITY: Force lowercase for Netlify/Linux compatibility
        routes.push(`${baseRoute}/${routeName}`.toLowerCase());
      }
    }
  });

  // Remove duplicates (e.g., if you have index.jsx and homepage.jsx)
  return [...new Set(routes)];
}

const myRoutes = getRoutes(pagesDir);
console.log('Final Cleaned Routes:', myRoutes);

// Use this for .cjs files
module.exports = myRoutes;